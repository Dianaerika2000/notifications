const express = require('express');
const app = express();
/* const { v4 : uuidv4 } = require('uuid'); */
const port = process.env.port || 3030;
/* let mysql = require('mysql'); */

// Your database credentials here same with the laravel app.
/* let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'realtime_db',
});
 */
// Now let's create a server that will listen to our port.
const server = app.listen(port, '0.0.0.0', function () {
    console.log(`Server started on port ${port}`);
  });
  


// Intialize Socket
const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

// Setup Socket IO.
io.on('connection', (socket) => {
    console.log('Client connected!');

    // Listener when user emit a order event
    socket.on('notification', (data) => {
        // Prepare data for table insertion for orders.
        console.log("data", data);
        let notification = {
            user_id: data.item_id,
            item_name: data.item_name,
            item_type: data.item_type,
            item_date: data.item_date,
            item_time: data.item_time,
            item_location: data.item_location,
            item_imagen: data.item_imagen,
        };

        console.log(notification);

        // Insert the database

        // Success

        // now let's notify the admin that there is an order from a user.
        io.emit('notification_processed', notification);

    });

    socket.on('notification_user', (data) => {
        // Prepare data for table insertion for orders.
        console.log(data);
        let notification = {
            message: 'Hola! Apareces en una foto',
            user_id: data.user_id,
            evento_id: data.evento_id,
            foto_c: data.foto_c,
            evento_name: data.evento_name,
            evento_lugar: data.evento_lugar,
            
        };

        /* console.log(notification); */

        io.emit('notification_processed_user', notification);

    });

    /* socket.on('order', (data) => {
        // Prepare data for table insertion for orders.
        let order = {
            order_code : uuidv4(),
            item_name : data.item_name,
            created_at : mysql.raw('CURRENT_TIMESTAMP()'),
            updated_at : mysql.raw('CURRENT_TIMESTAMP()')
        };
        
        // Insert the database
        connection.query('INSERT INTO orders SET ?', order, (error, results) => {
            if(error) throw error;
            // Success
            console.log(results);
            // now let's notify the admin that there is an order from a user.
            io.emit('order_processed', order);
        });
    }); */

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });
});
