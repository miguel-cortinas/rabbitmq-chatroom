const amqp = require('amqplib/callback_api');

const uri = "amqp://miguel:123@localhost:32773";

amqp.connect(uri, (err, con) => {
    if (err) {
        throw err;
    }

    con.createChannel((err1, channel) => {
        if (err1) {
            throw err1;
        }

        // Obtener nombres de los participantes (puedes obtenerlos de la línea de comandos)
        const participant1 = "Miguel";
        const participant2 = "goku";
        const senderQueueName = `${participant1}_${participant2}_sender`;
        const receiverQueueName = `${participant2}_${participant1}_receiver`;

        // Asegurar la existencia de la cola del remitente
        channel.assertQueue(senderQueueName, {
            durable: true
        });

        // Asegurar la existencia de la cola del receptor
        channel.assertQueue(receiverQueueName, {
            durable: true
        });

        // Leer mensajes desde la consola y enviarlos a la cola del remitente
        process.stdin.on('data', (data) => {
            const message = data.toString().trim();
            channel.sendToQueue(senderQueueName, Buffer.from(`${participant2}: ${message}`));
            console.log(`Mensaje enviado: ${participant2}: ${message}`);
        });

        // Consumir mensajes de la cola del receptor
        channel.consume(receiverQueueName, (message) => {
            console.log(`Recibido del receptor: ${message.content.toString()}`);
        }, { noAck: true });
    });
});
