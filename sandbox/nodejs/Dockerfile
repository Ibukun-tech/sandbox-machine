FROM node:18


# I am updating base image  to get the latest security update and also installinf coreutils for me to be able to use the file permission commands like shmod and chown
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends coreutils && \
#     rm -rf /var/lib/apt/lists/*


    # Create non-root user for better security
RUN useradd -m -u 10000 ibksandBox

#Set up directory structure
WORKDIR /sandbox

# RUN mkdir -p /sandbox/input /sandbox/output

# Create the directories
RUN mkdir -p /sandbox/input /sandbox/output

# copy the code to the container
COPY --chmod=500 --chown=ibksandbox:ibksandbox runner.js /sandbox/input


# setting the permissions and onwnership of the files and directories
# RUN chmod 500 /sandbox/input/runner.js && \ chmod 755 /sandbox/input && \ chown -R  ibksandBox:ibksandBox /sandbox 
# RUN chmod 755 /sandbox/input && \ chown -R  ibksandBox:ibksandBox /sandbox 
# set the user to run the container
# USER ibksandBox
# the entrypoint command to run the code
ENTRYPOINT [ "node", "/sandbox/input/runner.js" ]