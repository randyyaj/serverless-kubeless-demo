# Serverless + Kubeless Guide

This document serves as a guide to setting up servless with serveless-kubeless plugin. 
The guide provides instructions to configuring and running a sample application from start to finish; showcasing various functionality serverless-kubeless supports.

Demos
- kubeless functions
- serveless framework
- serverless calling kubeless function
- serverless cron using kubeless scheduler
- serverless rest endpoint using kubeless|kubernetes proxy
- serverless packaging
- serverless using typescript plugin
- TODO chained functions
- TODO backoff retry to external API
- TODO roles

## Kubeless Setup

### Install Minikube
```
$ brew cask install virtualbox
$ brew install minikube
$ minikube start --vm-driver=virtualbox
$ kubectl config use-context minikube
```

Switching context: You can switch context for kubernetes using use-context
for example using docker-for-desktop instead of minikube

```
$ kubectl config get-contexts
$ kubectl config use-context docker-for-desktop
```

### Install kubeless to the cluster
```
# Generate configmap

$ export RELEASE=$(curl -s https://api.github.com/repos/kubeless/kubeless/releases/latest | grep tag_name | cut -d '"' -f 4)
$ kubectl create ns kubeless
$ kubectl create -f https://github.com/kubeless/kubeless/releases/download/$RELEASE/kubeless-$RELEASE.yaml
```

### Install kubeless cli tool on unix machines
```
$ export OS=$(uname -s| tr '[:upper:]' '[:lower:]')

$ curl -OL https://github.com/kubeless/kubeless/releases/download/$RELEASE/kubeless_$OS-amd64.zip && \
  unzip kubeless_$OS-amd64.zip && \
  sudo mv bundles/kubeless_$OS-amd64/kubeless /usr/local/bin/

# Check to see if kubeless is installed
$ kubectl get pods -n kubeless
```

### Serverless Setup, Deploying, and Running 
```
$ npm i serverless -g
$ git clone <this project>
$ cd string-transform-kubeless
$ serverless login
$ npm install
$ serverless deploy -v
$ kubeless function ls -n kubeless
$ serverless invoke reverse -data 'hello world' -l
```

# Gotchas
> Not all of the functions provided by serverless-kubeless plugin is working and there are some minor annoyances present. See the notes below for details.
- In the serverless.yml file serverless-kubeless function names cannot be camelcased or snake case must use lowercase, periods and hypens only.
- serverless-kubeless doesn't like it when you nest functions: src/function/handler.ts. Try to keep files flat and in root.
- Deploying with dependencies is currently not working. Functions deployed with dependencies results into a status of NOT READY. See packaging in serveless.yml
- Chained sequences is currently not working. See functions in serverless.yml

# Reading resources
- https://serverless.com/framework/docs/providers/kubeless/
- https://kubernetes.io/docs/tasks/tools/install-minikube/
- https://kubernetes.io/docs/setup/learning-environment/minikube/
- https://codefresh.io/kubernetes-tutorial/local-kubernetes-mac-minikube-vs-docker-desktop/
- https://kubeless.io/docs/architecture/
- https://kubeless.io/docs/quick-start/
- https://kind.sigs.k8s.io/

# Kubenetes using Docker (Docker-For-Desktop)
If you are running docker locally and prefer to use kubernetes with docker over minikube; you can install kubernetes via docker > preferences > kubernetes > install

Enable docker-for-desktop dashboad
```
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended/kubernetes-dashboard.yaml
```

View docker-for-desktop browser dashboad
```
$ kubectl proxy
```

# Kubeless cheat sheet
```
# List functions
kubeless function ls

# List functions using namespace
kubeless function ls -n kubeless

# Call function
kubeless function call <function> --data <data>

# Log function
kubeless function logs <function>

# Describe function
kubeless function describe <function>

# Update function
kubeless function update <function> --from-file <file>

# Delete function
kubeless function delete <function>

# Hitting a kubeless function using curl
kubectl proxy -p 8080 & curl -L --data '{"Another": "Echo"}' \
  --header "Content-Type:application/json" \
  localhost:8080/api/v1/namespaces/default/services/hello:http-function-port/proxy/
{"Another": "Echo"}
```