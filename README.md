# ABB Demo app

Started project from [mu-project template](https://github.com/mu-semtech/mu-project).

### How to build mu-cl-resources for ARM(M1 chip)

The quest is:
* build first link https://github.com/madnificent/sbcl-quicklisp
* use result to build second link https://github.com/madnificent/lisp-webservice-docker
* use result to build third link https://github.com/mu-semtech/mu-cl-resources

```
git clone git@github.com:madnificent/sbcl-quicklisp.git
cd sbcl-quicklisp
docker build . -t sbcl-quicklisp:arm
cd ..

git clone git@github.com:madnificent/lisp-webservice-docker.git
cd lisp-webservice-docker
nano Dockerfile (change FROM to sbcl-quicklisp:arm)
docker build . -t lisp-webservice:arm
cd ..

git clone git@github.com:mu-semtech/mu-cl-resources.git
cd mu-cl-resources
nano Dockerfile (change FROM to lisp-webservice:arm)
git submodule init
git summodule update
docker build . -t mu-cl-resources:arm
cd ..
```
