## Installing Docker

**Note**: The Docker documentation will guide you heavily to install **Docker Desktop**.
Docker Desktop is no free software and while personal usage is free, commercial usage is requiring a paid subscription.
While the Docker company has every right to distribute software as they please, I want to *strongly* encourage you to look into free alternatives.

What we will thus install in this tutorial is `Docker CE` or `Docker Engine`, the free (as in licensed under the "Apache2" license) Linux daemon driving Docker Desktop.

If you are already weary of Docker given it's "open core"-business model (and you should be, their image registry is also only free to some extend) *or* you want a graphical application
to manage your containers, possibly install `Podman` and `Podman Desktop` instead, they provide near 100% compatibility with Docker (this whole tutorial was tested with podman as well).
See the [End of this document](#installing-podman-instead).

However if you want to get familiar with Docker instead, because your job requires it or for whatever reason, just continue.
If you wish to use Docker Desktop, follow the official install guide instead: https://www.docker.com/get-started/

- [Linux](#linux)
- [MacOS](#macos)
- [Windows](#windows)


### Linux

If your distribution is listed on [the Docker documentation](https://docs.docker.com/engine/install/), you should follow their installation guide.
This ensures you get up to date binaries, as package repositories often lack behind, and common configuration options.

If your distribution is not listed, checking your package index is probably a good idea.

As a last resort the docs contain links to statically linked binaries.

Once docker is installed, the `dockerd`-service will likely be already set up and started.
To check run `docker run hello-world`, which should error out, if it can't find the docker socket.

In that case you need to manually activate the service. On systems running systemd, this might be as easy as: `sudo systemctl enable --now dockerd`

### MacOS

This tutorial assumes you have the [`brew` package management](https://brew.sh) tool installed.
If this is all new to you, may I suggest looking into a graphical tool like [`Podman Desktop`](#podman-desktop)
or `Docker Desktop` (see disclaimer at the beginning of this document) instead.

Since containers are a Linux technology, we will need to setup a virtual machine.
A bunch of tools can do this automatically for us. We will explore `minikube` in this tutorial.

**Note**: If you already have VMs running with UTM, Parallels, VMWare, this solution might time out and fail to install.
Consider just installing a Ubuntu VM in that case and work in there.

1. First we need our hypervisor to run the virtual machine.
   On ARM/Apple Silicon Machines: `brew install qemu`
   On Intel Machines: `brew install hyperkit`
2. Install minikube: `brew install minikube`
3. Install the docker and docker-compose cli tools: `brew install docker docker-compose`
4. Tell minikube to setup the VM: `minikube start` - This will take a bit on the first start.
5. Set the necessary environment variables to connect to minikube: `eval $(minikube docker-env)`
6. Test docker: `docker run hello-world`

Repeat step 4-6 after every restart.

### Windows

Since containers are a Linux technology, we will need to setup a virtual machine.
The easiest solution is to simply setup WSL 2 and install docker engine in there.

- Follow the microsoft tutorial to install WSL 2: https://learn.microsoft.com/en-us/windows/wsl/install
  - The standard Ubuntu distribution is fine, if you decide to pick another one, make sure it's supported by docker. (See [Linux tutorial](#linux).)
- Enable systemd for WSL: https://learn.microsoft.com/de-de/windows/wsl/systemd
- Open a WSL 2 Terminal and follow the [Linux part](#linux) of this tutorial.


## Installing podman instead

Podman is a docker-compatible container engine developed primarily by RedHat, but 100% open source.

**When following the rest of this tutorial simply replace each instance of `docker` with `podman`!**

### Podman

- The core cli utility is packaged on many linux distributions: https://podman.io/docs/installation#linux-distributions
- On MacOS use: `brew install podman`
- On Windows get the installer here: https://github.com/containers/podman/releases

Podman requires a virtual machine just like docker on MacOS & Windows, but can set that up for you!

In a terminal run:
- `podman machine init` - On Windows this might install WSL2 ([more info](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md))
- and `podman machine start`

Afterwards you are ready to go!

### Podman Desktop

If you wish to use a graphical application, that is not Docker Desktop, check out [`Podman Desktop`](https://podman-desktop.io/)

- On Linux you still need to install the podman-cli tool
- On MacOS & Windows Podman Desktop can guide you through the necessary Virtual Machine creation and comes with all the tools you need

## Outro

Continue [here](1-database.md)