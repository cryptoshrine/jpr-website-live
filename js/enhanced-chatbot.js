// Enhanced AI Chatbot Functionality for JPR Roofing Solutions Ltd

class RoofingChatbot {
    constructor() {
        this.messages = [];
        this.context = {
            userName: '',
            userContact: '',
            userAddress: '',
            projectType: '',
            hasUploadedPhotos: false,
            conversationStage: 'greeting' // greeting, information_gathering, quote_request, appointment, support
        };
        this.initElements();
        this.initEventListeners();
        this.addInitialGreeting();
    }

    initElements() {
        this.chatbotButton = document.querySelector('.chatbot-button');
        this.chatbotContainer = document.querySelector('.chatbot-container');
        this.chatbotClose = document.querySelector('.chatbot-close');
        this.chatbotMessages = document.querySelector('.chatbot-messages');
        this.chatbotInput = document.querySelector('.chatbot-input input');
        this.chatbotSend = document.querySelector('.chatbot-send');
        
        // Create file upload input
        this.fileUpload = document.createElement('input');
        this.fileUpload.type = 'file';
        this.fileUpload.multiple = true;
        this.fileUpload.accept = 'image/*';
        this.fileUpload.style.display = 'none';
        document.body.appendChild(this.fileUpload);
    }

    initEventListeners() {
        // Toggle chatbot visibility
        this.chatbotButton.addEventListener('click', () => {
            this.chatbotContainer.style.display = 'block';
            
            // Scroll to bottom of messages
            this.scrollToBottom();
            
            // Focus input after a short delay (for mobile keyboards)
            setTimeout(() => {
                this.chatbotInput.focus();
            }, 300);
            
            // Add class to body to prevent background scrolling on mobile
            document.body.classList.add('chatbot-open');
        });
        
        this.chatbotClose.addEventListener('click', () => {
            this.chatbotContainer.style.display = 'none';
            
            // Remove class from body
            document.body.classList.remove('chatbot-open');
        });
        
        // Handle clicks outside of chatbot to close it
        document.addEventListener('click', (e) => {
            if (this.chatbotContainer.style.display === 'block' && 
                !this.chatbotContainer.contains(e.target) && 
                !this.chatbotButton.contains(e.target)) {
                this.chatbotContainer.style.display = 'none';
                document.body.classList.remove('chatbot-open');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.chatbotContainer.style.display === 'block') {
                this.scrollToBottom();
            }
        });
        
        // Send message on button click
        this.chatbotSend.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Handle file selection
        this.fileUpload.addEventListener('change', () => {
            if (this.fileUpload.files.length > 0) {
                const fileNames = Array.from(this.fileUpload.files).map(file => file.name).join(', ');
                this.addMessage(`Uploaded: ${fileNames}`, 'user');
                this.context.hasUploadedPhotos = true;
                
                // Process the response based on context
                setTimeout(() => {
                    if (this.context.conversationStage === 'quote_request') {
                        this.addMessage("Thank you for uploading the photos. These will help us provide a more accurate quote. Could you please provide your contact details (name, phone, and email) so we can get back to you?", 'bot');
                        this.context.conversationStage = 'information_gathering';
                    } else {
                        this.addMessage("Thank you for uploading the photos. Our team will review them and get back to you shortly. Is there anything else you'd like to tell us about your roofing issue?", 'bot');
                    }
                }, 600);
            }
        });
    }

    addInitialGreeting() {
        setTimeout(() => {
            this.addMessage("Hi there! I'm the JPR Roofing virtual assistant. How can I help you today? You can ask me about our services, request a quote, or inquire about funding options.", 'bot');
        }, 1000);
    }

    sendMessage() {
        const message = this.chatbotInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Store message in history
        this.messages.push({
            sender: 'user',
            text: message
        });
        
        // Clear input
        this.chatbotInput.value = '';
        
        // Process user message and get response
        setTimeout(() => {
            const response = this.processMessage(message);
            this.addMessage(response, 'bot');
            
            // Store bot response in history
            this.messages.push({
                sender: 'bot',
                text: response
            });
        }, 600);
    }

    addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(`message-${sender}`);
        messageElement.textContent = message;
        
        this.chatbotMessages.appendChild(messageElement);
        
        // Scroll to bottom of messages
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        // Scroll to bottom of messages with a small delay to ensure rendering
        setTimeout(() => {
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        }, 100);
    }

    processMessage(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Extract potential user information
        this.extractUserInfo(message);
        
        // Update conversation stage based on message content
        this.updateConversationStage(lowerMessage);
        
        // Handle based on conversation stage
        switch (this.context.conversationStage) {
            case 'greeting':
                return this.handleGreeting(lowerMessage);
            case 'information_gathering':
                return this.handleInformationGathering(lowerMessage);
            case 'quote_request':
                return this.handleQuoteRequest(lowerMessage);
            case 'appointment':
                return this.handleAppointment(lowerMessage);
            case 'support':
                return this.handleSupport(lowerMessage);
            default:
                return this.getGeneralResponse(lowerMessage);
        }
    }

    extractUserInfo(message) {
        // Extract name (simple pattern: "my name is [name]" or "I'm [name]")
        const nameMatch = message.match(/(?:my name is|i am|i'm) ([a-z\s]+)/i);
        if (nameMatch && nameMatch[1] && !this.context.userName) {
            this.context.userName = nameMatch[1].trim();
        }
        
        // Extract email (simple pattern for email addresses)
        const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
        if (emailMatch && emailMatch[0]) {
            this.context.userContact = emailMatch[0];
        }
        
        // Extract phone number (simple pattern for UK phone numbers)
        const phoneMatch = message.match(/(?:|\s)(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s|$)/);
        if (phoneMatch && phoneMatch[1]) {
            this.context.userContact = phoneMatch[1].trim();
        }
        
        // Extract project type
        const projectTypes = ['repair', 'replacement', 'installation', 'leak', 'flat roof', 'guttering', 'chimney'];
        for (const type of projectTypes) {
            if (message.toLowerCase().includes(type)) {
                this.context.projectType = type;
                break;
            }
        }
    }

    updateConversationStage(message) {
        // Update stage based on message content
        if (message.includes('quote') || message.includes('estimate') || message.includes('cost') || message.includes('price')) {
            this.context.conversationStage = 'quote_request';
        } else if (message.includes('appointment') || message.includes('schedule') || message.includes('book') || message.includes('visit')) {
            this.context.conversationStage = 'appointment';
        } else if (message.includes('problem') || message.includes('issue') || message.includes('help') || message.includes('support')) {
            this.context.conversationStage = 'support';
        } else if (this.context.conversationStage === 'greeting') {
            // If we're still in greeting stage, move to information gathering
            if (!message.includes('hello') && !message.includes('hi') && !message.includes('hey')) {
                this.context.conversationStage = 'information_gathering';
            }
        }
    }

    handleGreeting(message) {
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I help you with your roofing needs today?";
        }
        
        // If not a greeting, move to general response
        this.context.conversationStage = 'information_gathering';
        return this.getGeneralResponse(message);
    }

    handleInformationGathering(message) {
        // If we have user contact but no project type
        if (this.context.userContact && !this.context.projectType) {
            return "Thank you for providing your contact information. What type of roofing service are you interested in? We offer repairs, installations, replacements, flat roofs, guttering, and chimney work.";
        }
        
        // If we have project type but no contact
        if (this.context.projectType && !this.context.userContact) {
            return `I see you're interested in ${this.context.projectType}. To provide you with more information or a quote, could you please share your name and contact details?`;
        }
        
        // If we have both, move to quote request
        if (this.context.projectType && this.context.userContact) {
            this.context.conversationStage = 'quote_request';
            return `Great! We can help you with your ${this.context.projectType} project. Would you like to get a quote or schedule an inspection?`;
        }
        
        // If we don't have either, ask general questions
        return "To better assist you, could you tell me what type of roofing service you're looking for and provide your contact details?";
    }

    handleQuoteRequest(message) {
        // If we don't have photos yet, suggest upload
        if (!this.context.hasUploadedPhotos) {
            return "To provide you with an accurate quote, it would be helpful to see photos of your roof or the specific area that needs attention. Would you like to upload some photos?";
        }
        
        // If we have photos but no contact info
        if (this.context.hasUploadedPhotos && !this.context.userContact) {
            return "Thank you for the photos. To complete your quote request, could you please provide your name, phone number, and email address?";
        }
        
        // If we have everything needed
        if (this.context.hasUploadedPhotos && this.context.userContact) {
            return "Thank you for providing all the information. Our team will review your request and get back to you with a quote within 24 hours. Is there anything else you'd like to know in the meantime?";
        }
        
        return "For an accurate quote, we'll need some photos of your roof and your contact details. Would you like to upload photos now?";
    }

    handleAppointment(message) {
        // If no contact info
        if (!this.context.userContact) {
            return "I'd be happy to help you schedule an appointment. Could you please provide your name, phone number, and email address?";
        }
        
        // If we have contact info
        return "Thank you for your interest in scheduling an appointment. Our team will contact you at " + this.context.userContact + " to arrange a convenient time for a visit. Is there a specific date or time that works best for you?";
    }

    handleSupport(message) {
        // For emergency issues
        if (message.includes('emergency') || message.includes('urgent') || message.includes('leak') || message.includes('water')) {
            return "For roofing emergencies, please call us directly at 020 3114 2105 for immediate assistance. Our emergency team is available to help you.";
        }
        
        // For general support
        return "I'm sorry to hear you're experiencing an issue. Could you please describe the problem in detail? If possible, uploading photos would help us better understand the situation.";
    }

    getGeneralResponse(message) {
        // Check for keywords and return appropriate responses
        
        // Services
        if (message.includes('service') || message.includes('offer')) {
            return "We offer a full range of roofing services including repairs, installations, replacements, flat roofs, guttering, and chimney work. Is there a specific service you're interested in?";
        }
        
        // Roof repair
        if (message.includes('repair') || message.includes('fix') || message.includes('leak')) {
            return "We specialize in all types of roof repairs, from minor leaks to major damage. To provide an accurate quote, we'd need to assess the damage. Would you like to schedule a free inspection or upload photos of the issue?";
        }
        
        // Roof replacement
        if (message.includes('replace') || message.includes('replacement') || message.includes('new roof')) {
            return "Roof replacements are a significant investment. We offer various roofing materials and solutions to fit your needs and budget. Would you like to schedule a consultation to discuss options?";
        }
        
        // Flat roofs
        if (message.includes('flat roof') || message.includes('flat')) {
            return "We specialize in modern flat roof solutions using high-quality materials for durability and waterproofing. Would you like more information about our flat roof services or a quote?";
        }
        
        // Funding/grants
        if (message.includes('fund') || message.includes('grant') || message.includes('financial') || message.includes('assistance')) {
            return "There are several funding options available for roofing projects, including government grants for eligible homeowners. Would you like more information about the Home Repair Assistance Grant or other funding options?";
        }
        
        // Contact information
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('call')) {
            return "You can reach us at 020 3114 2105 or email us at jprroofingsolutions@gmail.com. Our office is located at Churchill House Serviced Offices, 120 Bunn's Lane, London, NW7 2AS.";
        }
        
        // Business hours
        if (message.includes('hour') || message.includes('open') || message.includes('time')) {
            return "Our business hours are Monday to Friday from 8:00 AM to 6:00 PM, Saturday from 9:00 AM to 4:00 PM, and we're closed on Sundays.";
        }
        
        // Upload photos
        if (message.includes('photo') || message.includes('picture') || message.includes('image') || message.includes('upload')) {
            this.promptPhotoUpload();
            return "You can upload photos of your roofing issue to help us better understand your needs. I've added an upload button below.";
        }
        
        // Thanks/gratitude
        if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
            return "You're welcome! Is there anything else I can help you with today?";
        }
        
        // Goodbye
        if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
            return "Thank you for chatting with us today. If you need any further assistance, don't hesitate to reach out. Have a great day!";
        }
        
        // Default response
        return "Thank you for your message. To better assist you, could you provide more details about your roofing needs? Alternatively, you can call us at 020 3114 2105 for immediate assistance.";
    }

    promptPhotoUpload() {
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
        
        this.chatbotMessages.appendChild(buttonContainer);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        
        // Handle upload button click
        uploadButton.addEventListener('click', () => {
            this.fileUpload.click();
        });
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.roofingChatbot = new RoofingChatbot();
});
