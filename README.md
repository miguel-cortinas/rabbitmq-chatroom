
# Actividad | Implementación de la arquitectura de un chat.

## Este es un ejemplo de un sistema de mensajería simple utilizando RabbitMQ en Node.js. Permite a dos participantes, `Miguel` y `goku`, intercambiar mensajes a través de colas RabbitMQ.


## `miguel.js`

El archivo `miguel.js` es un script de que usa RabbitMQ para intercambiar mensajes con otro participante (`goku`) a través de colas.

##  `goku.js`

El archivo `goku.js` es otro script de que también utiliza RabbitMQ para intercambiar mensajes con otro participante (`Miguel`).

## Uso:
Para poder usar este chatroom tenemos que instalar la dependencia `amqplib`:

    npm install amqplib

![npm install
](https://raw.githubusercontent.com/miguel-cortinas/rabbitmq-chatroom/master/images/Imagen4.png)

### Después, debemos abrir dos terminales, una para poder ejecutar miguel.js y otra para goku.js:

![termina
les](https://raw.githubusercontent.com/miguel-cortinas/rabbitmq-chatroom/master/images/imagen1.png)

### Una vez ejecutados, ya vamos a poder intercambiar mensajes:

![inicio del chat
](https://raw.githubusercontent.com/miguel-cortinas/rabbitmq-chatroom/master/images/Imagen2.png)

### RabbitMQ Management:

![rabbitmq management
](https://raw.githubusercontent.com/miguel-cortinas/rabbitmq-chatroom/master/images/Imagen3.png)