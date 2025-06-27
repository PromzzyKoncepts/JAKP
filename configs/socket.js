const ViewerCount = require('../models/ViewerCount');

module.exports = (io) => {
  let viewersCount = 0;
  const activeSockets = new Set();
  
  // Function to save viewer count to database
  const saveViewerCount = async () => {
    try {
      await ViewerCount.create({
        count: activeSockets.size,
        // streamId: 'your-stream-id' // Add if you have multiple streams
      });
      console.log(`Viewer count ${activeSockets.size} saved to database`);
    } catch (error) {
      console.error('Error saving viewer count:', error);
    }
  };

  // Set up interval to save viewer count periodically (e.g., every 5 minutes)
  const saveInterval = setInterval(saveViewerCount, 5 * 60 * 1000);
  
  io.on('connection', (socket) => {
    console.log('New client connected');
    activeSockets.add(socket.id);
    viewersCount = activeSockets.size;
    
    // Emit updated viewers count to all clients
    io.emit('viewersUpdate', viewersCount);
    
    // Save immediately on new connection
    saveViewerCount();
    
    // Listen for new comments
    socket.on('newComment', async (commentData) => {
      try {
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
      
      // Save immediately on disconnection
      saveViewerCount();
    });
  });

  // Clean up interval when server shuts down
  io.on('disconnect', () => {
    clearInterval(saveInterval);
  });
};