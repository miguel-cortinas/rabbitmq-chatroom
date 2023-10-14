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

        channel.assertQueue(senderQueueName, {
            durable: true
        });

        channel.assertQueue(receiverQueueName, {
            durable: true
        });

        process.stdin.on('data', (data) => {
            const message = data.toString().trim();
            channel.sendToQueue(senderQueueName, Buffer.from(`${participant2}: ${message}`));
            console.log(`Mensaje enviado: ${participant2}: ${message}`);
        });

        channel.consume(receiverQueueName, (message) => {
            console.log(`Recibido del receptor: ${message.content.toString()}`);
        }, { noAck: true });
    });
});
