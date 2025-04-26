FROM node:18-slim

# Create non-root user for better security
RUN useradd -m -u 1000 ibksandBox

#Set up directory structure
WORKDIR /sandbox

# RUN mkdir -p /sandbox/input /sandbox/output

# Create the directories
RUN mkdir /sandbox

# copy the code to the container
COPY runner.js /sandbox/
# setting the permissions and onwnership of the files and directories
RUN chmod 500 /sandbox/runner.js && \ chmod 755 /sandbox && \ chown -R  ibksandBox:ibksandBox /sandbox 
# set the user to run the container
USER ibksandBox
# the entrypoint command to run the code
ENTRYPOINT [ "node", "/sandbox/runner.js" ]