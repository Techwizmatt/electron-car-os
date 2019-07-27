import obd

print('CAR-OS STREAM-OBD has started')

connection = obd.Async()

connection.watch(obd.commands.SPEED)

connection.start()

print(connection.query(obd.commands.SPEED))