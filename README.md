# Hidden Agenda Client
Реверс сетевого протокола мобильного клиента игры [Hidden Agenda](https://store.playstation.com/en-us/product/UP9000-CUSA08019_00-PMFW000000000001).

## Использование
1. Узнайте свой ip в локальной сети
2. Если требуется подключить несколько игроков, задайте своей сетевой карте несколько ip (из-за особенностей протокола, невозможно подключить несколько игроков с одного ip)
3. Обновите список ip адресов в файле `package.json`
4. Запустите игру на PlayStation
5. Запустите клиент, выполнив команду `npm run client:1`, `npm run client:2` и т.д.

## Запуск вручную
`node client.js localIp ps4ip playerName playerColor`

## Use
1. Find out your ip in the local network
2. If you need to connect multiple players, set several ip for your network card (because of the protocol, it is impossible to connect multiple players from single ip)
3. Update list of ip addresses in the file `package.json`
4. Launch game on PlayStation
5. Start client by executing command `npm run client: 1`,` npm run client: 2`, etc.