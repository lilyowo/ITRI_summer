## 進入 postgreSQL Shell

Run `$sudo -i -u postgres`進入 postgres 用戶。Run `$psql`進入 shell.
Quit by `\q`, and `exit`.

## backslash commands

\l 查看當前資料庫，按 Q 退出。
\c DatabaseName 切換到指定數據庫，\dt 查看所有 table
\d TableName 查看資料表的 column、型別
\i + 檔案路徑 可以執行.sql 檔案
\q 結束 quit
\? 更多 backslash cammand 說明

安裝 Ubuntu 套件庫的 PostgreSQL

# 更新套件庫

    sudo apt update -y

安裝 PostgreSQL 相關套件

# 安裝 PostgreSQL

    sudo apt install postgresql postgresql-contrib

安裝完會自動啟動 PostgreSQL 服務，查看服務是否正常啟動

# 查看 PostgreSQL 服務狀態

    sudo systemctl status postgresql

看到 Active: active 表示已經正常啟動了

```
root@ubuntu:~# systemctl status postgresql
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Fri 2020-08-21 13:42:23 UTC; 39s ago
 Main PID: 3335 (code=exited, status=0/SUCCESS)
    Tasks: 0 (limit: 4632)
   CGroup: /system.slice/postgresql.service

Aug 21 13:42:23 ubuntu systemd[1]: Starting PostgreSQL RDBMS...
Aug 21 13:42:23 ubuntu systemd[1]: Started PostgreSQL RDBMS.
```

# 設定開機時自動啟動服務

    sudo systemctl enable postgresql
