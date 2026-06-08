---
id: topology
title: Network Topology
sidebar_position: 1
---

# Topology: Bank Mandiri

Ini adalah dokumen topologi jaringan untuk **Bank Mandiri**.

:::info Detail Lingkungan
Dokumen ini menguraikan arsitektur jaringan pada lingkungan Production.
:::

## Diagram Jaringan

*(Anda bisa memasukkan gambar atau diagram Mermaid di sini)*

```mermaid
graph TD;
    Internet-->Firewall;
    Firewall-->LoadBalancer;
    LoadBalancer-->AppServer1;
    LoadBalancer-->AppServer2;
    AppServer1-->Database;
    AppServer2-->Database;
```
