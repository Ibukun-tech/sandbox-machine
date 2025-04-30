package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

type Error struct {
	Type    string `json:"type,omitempty"`
	Message string `json:"message"`
}

type ExecutionResult struct {
	StdOut        []string `json:"stdout"`
	StdErr        []string `json:"stderr"`
	ExecutionTime float64  `json:"execution_time"`
	MemoryUsage   float64  `json:"memory_usage"`
	Success       bool     `json:"success"`
	Error         *Error   `json:"error,omitempty"`
}

func main() {
	codeFile := "game.go"
	if len(os.Args) > 1 {
		codeFile = os.Args[1]
	}
	inputFilePath := filepath.Join("/sandbox/input", codeFile)
	outputFilePath := filepath.Join("/sandbox/output", "result.json")
	result := ExecutionResult{
		StdOut:  []string{},
		StdErr:  []string{},
		Success: false,
	}

	if _, err := os.Stat(inputFilePath); os.IsNotExist(err) {
		result.Error = &Error{
			Message: fmt.Sprintf("Input file not found %s", inputFilePath),
		}
		writeResult(outputFilePath, result)
		os.Exit(1)
	}

	// Create a temporary build directory
	buildDir := os.TempDir()
	defer os.RemoveAll(buildDir)
	srcCode, err := os.ReadFile(inputFilePath)
	if err != nil {
		result.Error = &Error{
			Message: fmt.Sprintf("Failed to read source code %s", err),
		}
		writeResult(outputFilePath, result)
		os.Exit(1)
	}
	tempFile := filepath.Join(buildDir, "main.go")
	if err = os.WriteFile(tempFile, srcCode, 0644); err != nil {
		result.Error = &Error{
			Message: fmt.Sprintf("failed to write source code %s", err),
		}
		writeResult(outputFilePath, result)
		os.Exit(1)
	}

	excutablePath := filepath.Join(buildDir, "bin")
	cmd := exec.Command("go", "build", "-o", excutablePath, tempFile)
	stderr, err := cmd.CombinedOutput()
	if err != nil {
		result.Error = &Error{
			Type:    "Compilation error",
			Message: string(stderr),
		}
		writeResult(outputFilePath, result)
		os.Exit(1)
	}

	startTime := time.Now()
	cmd = exec.Command(excutablePath)
	var stdOutBuf, stdErrBuf strings.Builder
	cmd.Stdout = &stdOutBuf
	cmd.Stderr = &stdErrBuf

	err = cmd.Start()
	if err != nil {
		result.Error = &Error{
			Message: fmt.Sprintf("Failed to start %s", err),
		}
		writeResult(outputFilePath, result)
		os.Exit(1)
	}
	done := make(chan error, 1)
	go func() {
		done <- cmd.Wait()
	}()

	select {
	case err := <-done:
		if err != nil {
			result.Error = &Error{
				Message: fmt.Sprintf("Execution error %s", err),
			}
		} else {
			result.Success = true
		}

	case <-time.After(5 * time.Second):
		if err := cmd.Process.Kill(); err != nil {
			result.Error = &Error{
				Message: fmt.Sprintf("Failed to kill process: %s", err),
			}
		} else {
			result.Error = &Error{
				Type:    "Timeout",
				Message: fmt.Sprintf("Process killed after 5 seconds"),
			}
		}
	}
	// Collect metrics
	executionTime := time.Since(startTime).Seconds() * 1000
	var memStats runtime.MemStats
	runtime.ReadMemStats(&memStats)
	result.ExecutionTime = executionTime
	result.MemoryUsage = float64(memStats.Alloc) / 1024 / 1024
	result.StdOut = strings.Split(stdOutBuf.String(), "\n")
	result.StdErr = strings.Split(stdErrBuf.String(), "\n")

	if len(result.StdOut) > 0 && result.StdOut[len(result.StdOut)-1] == "" {
		result.StdOut = result.StdOut[:len(result.StdOut)-1]
	}

	if len(result.StdErr) > 0 && result.StdErr[len(result.StdErr)-1] == "" {
		result.StdErr = result.StdErr[:len(result.StdErr)-1]
	}

	writeResult(outputFilePath, result)
}

func writeResult(outputPath string, result ExecutionResult) {
	resultJSON, err := json.MarshalIndent(result, "", " ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to serialize result: %s", err)
		os.Exit(1)
	}
	if err := os.WriteFile(outputPath, resultJSON, 0644); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to serialize result: %s", err)
		os.Exit(1)
	}
}
