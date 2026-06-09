---
id: installation-guide
title: Instalation Guide 3dolphin
sidebar_position: 2
---
# Instalation Guide 3dolphin

## Operating System

- CentOS 9 Stream / Ubuntu / Rhel

## Timezone Configuration

- Run : `timedatectl set-timezone Asia/Jakarta`

## Turn Off Firewalld

```bash
systemctl disabled firewalld
systemctl stop firewalld
```

## sysctl configuration

- Append this parameter to `/etc/sysctl.conf`

```bash
net.ipv4.ip_local_port_range = 31000 65500
fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152
kernel.shmmax = 8329226240
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586
net.ipv4.tcp_sack = 0
vm.swappiness = 1
net.ipv4.ip_forward=1
```

- Run : `sysctl -p`
- Reboot Server : `sudo reboot`

| Parameter | Value | Status | Remarks |
| --- | --- | --- | --- |
| net.ipv4.ip_local_port_range | 31000 65500 |  |  |
| fs.aio-max-nr | 1048576 |  |  |
| fs.file-max | 6815744 |  |  |
| kernel.shmall | 2097152 |  |  |
| kernel.shmmax | 8329226240 |  |  |
| kernel.shmmni | 4096 |  |  |
| kernel.sem | 250 32000 100 128 |  |  |
| net.core.rmem_default | 262144 |  |  |
| net.core.rmem_max | 4194304 |  |  |
| net.core.wmem_default | 262144 |  |  |
| net.core.wmem_max | 1048586 |  |  |
| net.ipv4.tcp_sack | 0 |  |  |
| vm.swappiness | 1 |  |  |
| net.ipv4.ip_forward | 1 |  |  |

## Package Pre-requisites

- Run this to install epel-release, tomcat-native, memcached, and mysql

```bash
dnf -y install epel-release tomcat-native memcached lsof
dnf install https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
dnf -y install mysql-server
rpm jdk-11.0.18_linux-x64_bin.rpm
systemctl enable memcached/mysqld
systemctl start memcached/mysqld
```

- Run this to configure mysql user
    
    ```bash
    MYSQL_TEMP_PASS=$(tail -n 1500 /var/log/mysqld.log | grep 'temporary password' | awk '/localhost/{ print $13 }');
    #This command will print temporary password to the terminal and can be used for mysql_secure_installation
    echo "Generated MYSQL Temporary Password : $MYSQL_TEMP_PASS"
    mysql_secure_installation
    '
    Securing the MySQL server deployment.
    
    Enter password for user root: <Enter Temporary Password>
    
    The existing password for the user account root has expired. Please set a new password.
    
    New password: Dolphin@123
    
    Re-enter new password: Dolphin@123
    The validate_password component is installed on the server.
    The subsequent steps will run with the existing configuration
    of the component.
    Using existing password for root.
    
    Estimated strength of the password: 100
    Change the password for root ? ((Press y|Y for Yes, any other key for No) : n
    
     ... skipping.
    By default, a MySQL installation has an anonymous user,
    allowing anyone to log into MySQL without having to have
    a user account created for them. This is intended only for
    testing, and to make the installation go a bit smoother.
    You should remove them before moving into a production
    environment.
    
    Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
    Success.
    
    Normally, root should only be allowed to connect from
    'localhost'. This ensures that someone cannot guess at
    the root password from the network.
    
    Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
    Success.
    
    By default, MySQL comes with a database named 'test' that
    anyone can access. This is also intended only for testing,
    and should be removed before moving into a production
    environment.
    
    Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
     - Dropping test database...
    Success.
    
     - Removing privileges on test database...
    Success.
    
    Reloading the privilege tables will ensure that all changes
    made so far will take effect immediately.
    
    Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
    Success.
    '
    mysql -u root -pDolphin@123 -e "CREATE USER 'dolphin'@'%' IDENTIFIED BY 'Dolphin@123';GRANT ALL PRIVILEGES ON *.* TO 'dolphin'@'%';FLUSH PRIVILEGES;COMMIT;"
    
    ```
    

## /etc/ configuration

- Disable Selinux etc/sysconfig/selinux : `SELINUX=disabled`

- Create /etc/dolphin/ directory : `mkdir -p /etc/dolphin`

| File Name | Value | Status | Remarks |
| --- | --- | --- | --- |
| security/limits.conf | dolphin  soft         nofile	65000
dolphin  hard	nofile	65000
dolphin  soft  	nproc	65000
dolphin  hard	nproc	65000 | done |  |
| environment | LANG=en_US.UTF-8
LC_ALL=en_US.UTF-8 | done |  |
| dolphin/dolphin.conf | install.dir=/opt/3dolphin | done |  |
| ssh/sshd_config | Port 22
PermitRootLogin no
MaxAuthTries 3
PasswordAuthentication yes
AllowTcpForwarding no
PermitEmptyPasswords no
ClientAliveInterval 300 | done |  |
| sysconfig/memcached | MAXCONN="1024”
CACHESIZE="2048” | done |  |
| hosts | {server tetangga nya (jika ada)}
127.0.0.1 localminio.3dolphins.ai
127.0.0.1/IP Private server {DNS Customer}
{server third party untuk integrasi} |  |  |
| profile | ...... 
# PROXY JIKA DIBUTUHKAN
http_proxy=http://10.40.1.68:80
https_proxy=http://10.40.1.68:80
# ATAU JIKA PAKAI AUTHENTIKASI
http_proxy=[http://{user}:{password}@proxy](http://user:password@proxy/):port/
https_proxy=[http://{user}:{password}@proxy](http://user:password@proxy/):port/
# SETTING NO_PROXY untuk host yang tidak diinginkan lewat proxy
no_proxy=localhost,3dolphins.ai
export http_proxy
export https_proxy
export no_proxy
...... | done |  |
| hostname | gg-dev-app-1 | done |  |
| my.cnf | max_connections=4000
..... if using NDB CLUSTER

..... if using master/slave | done |  |
| group | useradd dolphin
groupadd inmotion
usermod -g 1001 -G inmotion dolphin | done | 
 |
- Execute `systemctl restart sshd`

### /home/dolphin/ configuration

| File Name | Value | Status | Remarks |
| --- | --- | --- | --- |
| .bash_profile | .....
OMP_NUM_THREADS=1;
export OMP_NUM_THREADS
..... |  |  |
| .minio/certs | Must contain public.crt and private.key |  |  |
| script | Kumpulan dari semua script yang sudah dibuat |  |  |
| patchYYYYMMDD | Pattern standard untuk melakukan patch dan maksimal hanya ada 2 folder |  |  |

### /opt/ Configuration

| File Name | Sub directory | Sub-sub directory | Status | Remarks |
| --- | --- | --- | --- | --- |
| dolphin | solr | default |  |  |
|  | zoodata-solr | default |  |  |
|  | zookeeper-solr | default |  |  |
|  | zookeeper-locking | default |  |  |
|  | zoodata-locking | default |  |  |
|  | kafka | default |  |  |
|  | kafka-data | default |  |  |
|  | zookeeper-kafka | default |  |  |
|  | zoodata-kafka | default |  |  |
|  | minio (standalone mode) | minio executeable |  |  |
|  | minio-data (standalone mode) | app-document
app-report
broadcast-audience
broadcast-personalized-content
channel-metadata
dialog-corpus
dialog-model
dialog-sdk
livechat-widget
media-audios-inbound
media-audios-outbound
media-broadcast-document
media-broadcast-image
media-broadcast-video
media-documents-inbound
media-documents-outbound
media-documents-sales
media-images-button
media-images-content
media-images-group
media-images-inbound
media-images-outbound
media-images-sdk
media-videos-inbound
media-videos-outbound
neural-model
sales-contact-document
telegram-metadata
watermark-temp
youtube-metadata | Note 
default-model
app-documet (untuk folder ini pastikan untuk isi dalamnyatidak di hapus) |  |
|  | minio (cluster mode) |  |  |  |
|  | minio-data (cluster mode) |  |  |  |
| 3dolphin | bin | broadcast/broadcast
classifier/classify
classifier/encoder
classifier/learning
classifier/paragraphvec
classifier/domain
classifier/dialog
coordinator/social
gateway/gateway (lib terpisah)
meeting/zoom (lib terpisah)
lb/lb
replication/replicate
scheduler/sched |  |  |
|  | config | broadcast.properties
command.block
email.block
license.properties
onelogin.saml.properties
resources.properties
signup-approve.tpl
signup.tpl
zoom.properties |  |  |
|  | data | list collection 3dolphins |  |  |
|  | dictionary | gaul_words.dat
stop_words.dat
abbrv_words.dat
adverb_words.dat
nom_words.dat
adj_words.dat
pron_words.dat
acron_words.dat
part_words.dat
num_words.dat
verb_words.dat
basic_words.dat |  |  |
|  | dolphin-web | bin
conf
crash
include
lib
logs
temp
webapps
work |  |  |
|  | keystore | All file certificate |  |  |
|  | library | contrib
dist
sdk
elastic-apm-agent-1.3.0.jar |  |  |
|  | solr | config/config
config/collection_name (cluster only) |  |  |
|  | temp | replication
paragraph
paragraph-model |  |  |
| 3dolphin-data (Exist if only use cluster mode) | NodeX | instancesX/collectionName |  |  |
| Webservices | Depend On SDK running from delivery team or partner |  |  |  |

### /backup configuration

| File Name | Sub Directory | Status | Remarks |
| --- | --- | --- | --- |
| solr | YYYYMMDD/collection.json |  |  |
| mysql | YYYYMMDD.sql |  |  |
| files |  |  |  |
