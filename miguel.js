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

        // participantes
        const participant1 = "Miguel";
        const participant2 = "goku";
        const senderQueueName = `${participant1}_${participant2}_sender`;
        const receiverQueueName = `${participant2}_${participant1}_receiver`;

        // Asegurar la existencia de la cola del remitente
        channel.assertQueue(senderQueueName, {
            durable: true
        });

        channel.assertQueue(receiverQueueName, {
            durable: true
        });

        // Leer mensajes desde la consola y enviarlos a la cola del receptor
        process.stdin.on('data', (data) => {
            const message = data.toString().trim();
            channel.sendToQueue(receiverQueueName, Buffer.from(`${participant1}: ${message}`));
            console.log(`Mensaje enviado: ${participant1}: ${message}`);
        });
        
        // Consumir mensajes de la cola del remitente
        channel.consume(senderQueueName, (message) => {
            console.log(`Recibido del remitente: ${message.content.toString()}`);
        }, { noAck: true });
    });
});
