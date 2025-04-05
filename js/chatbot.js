// Chatbot JavaScript for JPR Roofing Solutions Ltd

document.addEventListener('DOMContentLoaded', function() {
    // Chatbot Elements
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    // Chatbot Toggle
    if (chatbotButton && chatbotContainer && chatbotClose) {
        // Open chatbot
        chatbotButton.addEventListener('click', function() {
            chatbotContainer.style.display = 'block';
            chatbotInput.focus();
        });
        
        // Close chatbot
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });
    }
    
    // Chatbot Messaging
    if (chatbotInput && chatbotSend && chatbotMessages) {
        // Send message on button click
        chatbotSend.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Function to send user message and get bot response
        function sendMessage() {
            const message = chatbotInput.value.trim();
            
            if (message === '') return;
            
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input
            chatbotInput.value = '';
            
            // Get bot response (with slight delay to simulate thinking)
            setTimeout(function() {
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 600);
        }
        
        // Function to add message to chat
        function addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(`message-${sender}`);
            messageElement.textContent = message;
            
            chatbotMessages.appendChild(messageElement);
            
            // Scroll to bottom of messages
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        // Function to get bot response based on user input
        function getBotResponse(message) {
            // Convert message to lowercase for easier matching
            const lowerMessage = message.toLowerCase();
            
            // Check for keywords and return appropriate responses
            
            // Greetings
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                return "Hello! How can I help you with your roofing needs today?";
            }
            
            // Quote/Estimate requests
            if (lowerMessage.includes('quote') || lowerMessage.includes('estimate') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
                return "I'd be happy to help you get a quote! Could you please provide some details about your project? What type of roofing service do you need (repair, installation, replacement, etc.)?";
            }
            
            // Service inquiries
            if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
                return "We offer a full range of roofing services including repairs, installations, replacements, flat roofs, guttering, and chimney work. Is there a specific service you're interested in?";
            }
            
            // Roof repair
            if (lowerMessage.includes('repair') || lowerMessage.includes('fix') || lowerMessage.includes('leak')) {
                return "We specialize in all types of roof repairs, from minor leaks to major damage. To provide an accurate quote, we'd need to assess the damage. Would you like to schedule a free inspection or upload photos of the issue?";
            }
            
            // Roof replacement
            if (lowerMessage.includes('replace') || lowerMessage.includes('replacement') || lowerMessage.includes('new roof')) {
                return "Roof replacements are a significant investment. We offer various roofing materials and solutions to fit your needs and budget. Would you like to schedule a consultation to discuss options?";
            }
            
            // Flat roofs
            if (lowerMessage.includes('flat roof') || lowerMessage.includes('flat')) {
                return "We specialize in modern flat roof solutions using high-quality materials for durability and waterproofing. Would you like more information about our flat roof services or a quote?";
            }
            
            // Funding/grants
            if (lowerMessage.includes('fund') || lowerMessage.includes('grant') || lowerMessage.includes('financial') || lowerMessage.includes('assistance')) {
                return "There are several funding options available for roofing projects, including government grants for eligible homeowners. Would you like more information about the Home Repair Assistance Grant or other funding options?";
            }
            
            // Contact information
            if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
                return "You can reach us at 020 3114 2105 or email us at jprroofingsolutions@gmail.com. Our office is located at Churchill House Serviced Offices, 120 Bunn's Lane, London, NW7 2AS.";
            }
            
            // Business hours
            if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
                return "Our business hours are Monday to Friday from 8:00 AM to 6:00 PM, Saturday from 9:00 AM to 4:00 PM, and we're closed on Sundays.";
            }
            
            // Emergency services
            if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('asap')) {
                return "We understand roofing emergencies require immediate attention. Please call us directly at 020 3114 2105 for our emergency roofing service.";
            }
            
            // Upload photos
            if (lowerMessage.includes('photo') || lowerMessage.includes('picture') || lowerMessage.includes('image') || lowerMessage.includes('upload')) {
                return "You can upload photos of your roofing issue through our contact form. This helps us better understand your needs before scheduling a visit. Would you like to do that now?";
            }
            
            // Schedule appointment
            if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('book') || lowerMessage.includes('visit')) {
                return "I'd be happy to help you schedule an appointment. Could you please provide your preferred date and time, along with your contact information and address?";
            }
            
            // Thanks/gratitude
            if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
                return "You're welcome! Is there anything else I can help you with today?";
            }
            
            // Goodbye
            if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
                return "Thank you for chatting with us today. If you need any further assistance, don't hesitate to reach out. Have a great day!";
            }
            
            // Default response for unrecognized queries
            return "Thank you for your message. To better assist you, could you provide more details about your roofing needs? Alternatively, you can call us at 020 3114 2105 for immediate assistance.";
        }
        
        // Add initial greeting after a short delay
        setTimeout(function() {
            addMessage("Hi there! I'm the JPR Roofing virtual assistant. How can I help you today? You can ask me about our services, request a quote, or inquire about funding options.", 'bot');
        }, 1000);
    }
    
    // File upload handling for chatbot
    const chatbotFileUpload = document.createElement('input');
    chatbotFileUpload.type = 'file';
    chatbotFileUpload.multiple = true;
    chatbotFileUpload.accept = 'image/*';
    chatbotFileUpload.style.display = 'none';
    document.body.appendChild(chatbotFileUpload);
    
    // Function to handle file upload request in chat
    function handleFileUploadRequest() {
        addMessage("Please upload photos of your roofing issue to help us better understand your needs.", 'bot');
        
        // Create upload button in chat
        const uploadButton = document.createElement('button');
        uploadButton.textContent = 'Upload Photos';
        uploadButton.classList.add('chatbot-upload-button');
        uploadButton.style.margin = '10px 0';
        uploadButton.style.padding = '8px 16px';
        uploadButton.style.backgroundColor = '#4CAF50';
        uploadButton.style.color = 'white';
        uploadButton.style.border = 'none';
        uploadButton.style.borderRadius = '4px';
        uploadButton.style.cursor = 'pointer';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('message', 'message-bot');
        buttonContainer.appendChild(uploadButton);
        
        chatbotMessages.appendChild(buttonContainer);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Handle upload button click
        uploadButton.addEventListener('click', function() {
            chatbotFileUpload.click();
        });
        
        // Handle file selection
        chatbotFileUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                addMessage(`Uploaded: ${fileNames}`, 'user');
                addMessage("Thank you for uploading the photos. Our team will review them and get back to you shortly. Would you like to provide any additional information about your roofing issue?", 'bot');
            }
        });
    }
    
    // Add global function to trigger file upload from main chat
    window.requestPhotoUpload = handleFileUploadRequest;
});
