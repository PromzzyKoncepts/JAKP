module.exports = (io) => {
  let viewersCount = 0;
  const activeSockets = new Set();
  
  io.on('connection', (socket) => {
    console.log('New client connected');
    activeSockets.add(socket.id);
    viewersCount = activeSockets.size;
    
    // Emit updated viewers count to all clients
    io.emit('viewersUpdate', viewersCount);
    
    // Listen for new comments
    socket.on('newComment', async (commentData) => {
      try {
        // Broadcast the new comment to all clients including the sender
        io.emit('newComment', commentData);
      } catch (error) {
        console.error('Error handling new comment:', error);
      }
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      activeSockets.delete(socket.id);
      viewersCount = activeSockets.size;
      io.emit('viewersUpdate', viewersCount);
    });
  });
};