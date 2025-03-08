// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 滚动时改变导航栏样式
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)'; // 小米风格的阴影更轻
        } else {
            header.style.boxShadow = 'none';
        }
        
        // 滚动隐藏/显示导航栏 - 小米风格的过渡更快
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 设置连接线的初始位置和角度
    setupConnectionLines();
    
    // 窗口大小改变时重新计算连接线
    window.addEventListener('resize', setupConnectionLines);

    // 初始化动态背景 - 小米风格
    initMiDynamicBackground();
    
    // 初始化模型卡片数据流动画
    initMiModelFlows();

    // 模型气泡交互效果
    const modelBubbles = document.querySelectorAll('.model-bubble');
    const deviceMockup = document.querySelector('.device-mockup');
    
    // 为每个气泡添加悬停效果和点击效果
    modelBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            // 高亮显示设备和连接线
            deviceMockup.style.boxShadow = '0 40px 70px -15px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.4)';
            
            // 获取当前气泡的ID
            const modelId = this.id.split('-')[0];
            
            // 高亮对应的连接线
            const connectionLine = document.getElementById(`${modelId}-line`);
            if (connectionLine) {
                connectionLine.style.opacity = '1';
                connectionLine.style.boxShadow = '0 0 10px rgba(0, 113, 227, 0.7)';
                connectionLine.style.height = '3px';
            }
            
            // 根据不同模型改变设备中的点的颜色
            const dots = document.querySelectorAll('.dot');
            
            if (modelId === 'gpt4') {
                dots.forEach(dot => {
                    dot.style.backgroundColor = '#10a37f';
                    dot.style.boxShadow = '0 0 20px rgba(16, 163, 127, 0.8)';
                });
                if (connectionLine) {
                    connectionLine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0), rgba(16, 163, 127, 0.7), rgba(255,255,255,0))';
                }
                // 高亮设备环
                highlightDeviceRing('#10a37f');
            } else if (modelId === 'claude') {
                dots.forEach(dot => {
                    dot.style.backgroundColor = '#8a2be2';
                    dot.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.8)';
                });
                if (connectionLine) {
                    connectionLine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0), rgba(138, 43, 226, 0.7), rgba(255,255,255,0))';
                }
                // 高亮设备环
                highlightDeviceRing('#8a2be2');
            } else if (modelId === 'grok') {
                dots.forEach(dot => {
                    dot.style.backgroundColor = '#eb5757';
                    dot.style.boxShadow = '0 0 20px rgba(235, 87, 87, 0.8)';
                });
                if (connectionLine) {
                    connectionLine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0), rgba(235, 87, 87, 0.7), rgba(255,255,255,0))';
                }
                // 高亮设备环
                highlightDeviceRing('#eb5757');
            }
            
            // 添加光亮效果到气泡
            this.style.boxShadow = '0 25px 45px rgba(0, 0, 0, 0.15), inset 0 -3px 8px rgba(0, 0, 0, 0.05), inset 0 3px 8px rgba(255, 255, 255, 0.9)';
            this.style.transform = 'scale(1.15) translateY(-10px)';
            
            // 增强脉冲效果
            const bubblePulse = this.querySelector('.bubble-pulse');
            if (bubblePulse) {
                bubblePulse.style.animationDuration = '2s';
                bubblePulse.style.opacity = '1';
            }
            
            // 改变设备内的网格颜色
            const deviceGrid = document.querySelector('.device-grid');
            if (deviceGrid && modelId === 'gpt4') {
                deviceGrid.style.backgroundImage = `
                    linear-gradient(rgba(16, 163, 127, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(16, 163, 127, 0.1) 1px, transparent 1px)
                `;
                deviceGrid.style.opacity = '0.5';
            } else if (deviceGrid && modelId === 'claude') {
                deviceGrid.style.backgroundImage = `
                    linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)
                `;
                deviceGrid.style.opacity = '0.5';
            } else if (deviceGrid && modelId === 'grok') {
                deviceGrid.style.backgroundImage = `
                    linear-gradient(rgba(235, 87, 87, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(235, 87, 87, 0.1) 1px, transparent 1px)
                `;
                deviceGrid.style.opacity = '0.5';
            }
        });
        
        bubble.addEventListener('mouseleave', function() {
            // 恢复设备默认样式
            deviceMockup.style.boxShadow = '0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 -1px 1px rgba(0, 0, 0, 0.3)';
            
            // 恢复默认点颜色
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.backgroundColor = '#0071e3';
                dot.style.boxShadow = '0 0 15px rgba(0, 113, 227, 0.7)';
            });
            
            // 恢复连接线默认样式
            const modelId = this.id.split('-')[0];
            const connectionLine = document.getElementById(`${modelId}-line`);
            if (connectionLine) {
                connectionLine.style.opacity = '0';
                connectionLine.style.boxShadow = 'none';
                connectionLine.style.height = '2px';
            }
            
            // 恢复默认样式
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 -3px 8px rgba(0, 0, 0, 0.05), inset 0 3px 8px rgba(255, 255, 255, 0.9)';
            this.style.transform = '';
            
            // 恢复脉冲效果
            const bubblePulse = this.querySelector('.bubble-pulse');
            if (bubblePulse) {
                bubblePulse.style.animationDuration = '3s';
                bubblePulse.style.opacity = '0';
            }
            
            // 恢复设备环
            resetDeviceRing();
            
            // 恢复设备内的网格颜色
            const deviceGrid = document.querySelector('.device-grid');
            if (deviceGrid) {
                deviceGrid.style.backgroundImage = `
                    linear-gradient(rgba(0, 113, 227, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 113, 227, 0.05) 1px, transparent 1px)
                `;
                deviceGrid.style.opacity = '0.3';
            }
        });
        
        bubble.addEventListener('click', function() {
            // 点击气泡时滚动到模型部分
            const modelsSection = document.getElementById('models');
            window.scrollTo({
                top: modelsSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // 高亮显示对应的模型卡片
            const modelId = this.id.split('-')[0];
            const modelCard = document.querySelector(`.model-card[data-model="${modelId}"]`);
            
            if (modelCard) {
                // 添加闪光动画
                modelCard.classList.add('highlight-card');
                
                // 创建闪光效果
                const flashLight = document.createElement('div');
                flashLight.classList.add('model-card-flash');
                modelCard.appendChild(flashLight);
                
                // 2秒后移除高亮和闪光效果
                setTimeout(() => {
                    modelCard.classList.remove('highlight-card');
                    if (flashLight.parentNode === modelCard) {
                        modelCard.removeChild(flashLight);
                    }
                }, 2000);
            }
        });
    });

    // 3D倾斜效果 - 设备跟随鼠标移动
    const deviceContainer = document.querySelector('.device-container');
    if (deviceContainer) {
        deviceContainer.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            deviceMockup.style.transform = `translate(-50%, -50%) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });
        
        deviceContainer.addEventListener('mouseleave', function() {
            deviceMockup.style.transform = 'translate(-50%, -50%) rotateX(10deg)';
        });
    }

    // 滚动时添加淡入动画
    const elementsToAnimate = document.querySelectorAll('.feature-card, .model-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // 添加滚动平滑效果
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links-column a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const deviceContainer = document.querySelector('.device-container');
        
        if (deviceContainer) {
            deviceContainer.style.transform = `translateY(${scrollTop * 0.05}px)`;
        }
        
        // 对浮动背景元素应用视差效果
        const floatingParticles = document.querySelectorAll('.floating-particle');
        floatingParticles.forEach((particle, index) => {
            const speed = 0.03 + (index * 0.01);
            particle.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });

    // 特性卡片交互效果
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            icon.style.transform = 'scale(1.2) translateY(-5px)';
            icon.style.color = 'var(--accent-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            icon.style.transform = '';
            icon.style.color = '';
        });
    });

    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, '请输入您的邮箱');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入留言内容');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // 这里会添加表单提交逻辑
                showFormSuccess();
            }
        });
    }

    // 初始化
    initDeviceMockup();
});

// 初始化小米风格的动态背景
function initMiDynamicBackground() {
    // 创建简洁的浮动元素 - 小米风格更简洁
    const floatingBg = document.querySelector('.floating-bg');
    if (!floatingBg) return;
    
    // 添加几个浮动方块（小米风格倾向于几何形状）
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle extra-particle';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.width = `${40 + Math.random() * 60}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = `${0.1 + Math.random() * 0.1}`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.borderRadius = '4px'; // 小米风格方形圆角
        
        // 小米品牌色调
        const colors = [
            'rgba(255, 103, 0, 0.02)', // 小米橙
            'rgba(0, 193, 222, 0.02)', // 小米蓝
            'rgba(100, 100, 100, 0.02)' // 灰色
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `linear-gradient(135deg, ${color}, rgba(255, 255, 255, 0))`;
        
        floatingBg.appendChild(particle);
    }
}

// 初始化小米风格的模型数据流动画
function initMiModelFlows() {
    const deviceFrame = document.querySelector('.mi-device-frame');
    if (!deviceFrame) return;
    
    const deviceRect = deviceFrame.getBoundingClientRect();
    const deviceCenter = {
        x: deviceRect.left + deviceRect.width / 2,
        y: deviceRect.top + deviceRect.height / 2
    };
    
    // 设置模型卡片与数据流连接的位置和角度
    const models = ['gpt4', 'claude', 'grok'];
    models.forEach(model => {
        const card = document.getElementById(`${model}-card`);
        const flow = document.getElementById(`${model}-flow`);
        
        if (!card || !flow) return;
        
        const cardRect = card.getBoundingClientRect();
        const cardCenter = {
            x: cardRect.left + cardRect.width / 2,
            y: cardRect.top + cardRect.height / 2
        };
        
        // 计算角度和距离
        const angle = Math.atan2(cardCenter.y - deviceCenter.y, cardCenter.x - deviceCenter.x);
        const distance = Math.sqrt(
            Math.pow(cardCenter.x - deviceCenter.x, 2) + 
            Math.pow(cardCenter.y - deviceCenter.y, 2)
        ) * 0.8; // 小米风格的连接线稍短
        
        // 设置数据流的位置和角度
        flow.style.top = `${deviceCenter.y}px`;
        flow.style.left = `${deviceCenter.x}px`;
        flow.style.width = `${distance}px`;
        flow.style.transform = `rotate(${angle}rad)`;
        flow.style.transformOrigin = '0 0';
        
        // 添加交互效果
        card.addEventListener('mouseenter', () => {
            flow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            flow.style.opacity = '0';
        });
    });
}

// 添加代码下滑动画初始化 - 小米风格
function animateMiCodeLines() {
    const codeLines = document.querySelectorAll('.mi-code-line');
    
    codeLines.forEach((line, index) => {
        line.style.animation = `mi-code-line 3s infinite`;
        line.style.animationDelay = `${index * 0.5}s`;
    });
}

// 高亮设备环 - 小米风格
function highlightDeviceRing(color) {
    const deviceRing = document.querySelector('.device-ring');
    if (!deviceRing) return;
    
    // 小米风格的透明度更低
    const rgbaColor = color.replace('#', 'rgba(') + ', 0.08)';
    const rgbaColorFaint = color.replace('#', 'rgba(') + ', 0.04)';
    
    deviceRing.style.borderColor = rgbaColor;
    
    // 更新伪元素的颜色
    const style = document.createElement('style');
    style.id = 'dynamic-ring-style';
    style.textContent = `
        .device-ring::before {
            border-color: ${rgbaColorFaint};
        }
        .device-ring::after {
            border-color: ${rgbaColorFaint.replace('0.05', '0.03')};
        }
    `;
    
    // 移除任何先前的动态样式
    const prevStyle = document.getElementById('dynamic-ring-style');
    if (prevStyle && prevStyle.parentNode) {
        prevStyle.parentNode.removeChild(prevStyle);
    }
    
    document.head.appendChild(style);
}

// 重置设备环
function resetDeviceRing() {
    const deviceRing = document.querySelector('.device-ring');
    if (!deviceRing) return;
    
    deviceRing.style.borderColor = 'rgba(0, 113, 227, 0.1)';
    
    // 移除任何动态样式
    const prevStyle = document.getElementById('dynamic-ring-style');
    if (prevStyle && prevStyle.parentNode) {
        prevStyle.parentNode.removeChild(prevStyle);
    }
}

// 设置连接线 - 小米风格
function setupConnectionLines() {
    const models = [
        { id: 'gpt4-bubble', color: '#ff6700' }, // 小米橙色
        { id: 'claude-bubble', color: '#00c1de' }, // 浅蓝色
        { id: 'grok-bubble', color: '#424242' }  // 深灰色
    ];
    
    // 获取设备模型的位置
    const device = document.querySelector('.device-mockup');
    if (!device) return;
    
    const deviceRect = device.getBoundingClientRect();
    const deviceCenter = {
        x: deviceRect.left + deviceRect.width / 2,
        y: deviceRect.top + deviceRect.height / 2
    };
    
    // 更新每个模型连接线的位置
    models.forEach(model => {
        const bubble = document.getElementById(model.id);
        const line = document.getElementById(model.id.replace('bubble', 'line'));
        
        if (!bubble || !line) return;
        
        const bubbleRect = bubble.getBoundingClientRect();
        const bubbleCenter = {
            x: bubbleRect.left + bubbleRect.width / 2,
            y: bubbleRect.top + bubbleRect.height / 2
        };
        
        // 计算角度和距离 - 小米风格更直接的连接
        const angle = Math.atan2(bubbleCenter.y - deviceCenter.y, bubbleCenter.x - deviceCenter.x);
        const distance = Math.sqrt(
            Math.pow(bubbleCenter.x - deviceCenter.x, 2) + 
            Math.pow(bubbleCenter.y - deviceCenter.y, 2)
        );
        
        // 设置连接线的位置和旋转
        line.style.top = `${deviceCenter.y}px`;
        line.style.left = `${deviceCenter.x}px`;
        line.style.width = `${distance * 0.8}px`; // 小米风格线条稍短
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 0';
        
        // 设置连接线颜色
        line.style.background = `linear-gradient(90deg, 
            ${model.color}10, 
            ${model.color}30)`; 
        
        // 小米风格的简洁动画效果
        bubble.addEventListener('mouseenter', () => {
            line.style.width = `${distance * 0.9}px`; // 小米风格悬停效果较小
            line.style.background = `linear-gradient(90deg, 
                ${model.color}40, 
                ${model.color}60)`;
            line.style.transition = 'all 0.2s ease';
            highlightDeviceRing(model.color);
        });
        
        bubble.addEventListener('mouseleave', () => {
            line.style.width = `${distance * 0.8}px`;
            line.style.background = `linear-gradient(90deg, 
                ${model.color}10, 
                ${model.color}30)`;
            line.style.transition = 'all 0.3s ease';
            resetDeviceRing();
        });
    });
}

// 初始化设备模型 - 小米风格
function initDeviceMockup() {
    // 添加额外的样式到设备模型卡片
    const deviceMockup = document.querySelector('.device-mockup');
    
    if (deviceMockup) {
        const style = document.createElement('style');
        style.textContent = `
            .highlight-card {
                transform: translateY(-15px) !important;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2) !important;
                transition: all 0.3s ease !important;
            }
            
            .model-card-flash {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
                background-size: 200% 200%;
                border-radius: var(--border-radius);
                pointer-events: none;
                z-index: 10;
                animation: flash 1.5s ease-out;
            }
            
            @keyframes flash {
                0% {
                    background-position: 100% 100%;
                    opacity: 0;
                }
                30% {
                    opacity: 1;
                }
                100% {
                    background-position: 0% 0%;
                    opacity: 0;
                }
            }
            
            .extra-particle {
                position: absolute;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                opacity: 0.2;
                animation: float-particle var(--duration, 25s) linear infinite;
            }
        `;
        
        document.head.appendChild(style);
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error');
    
    // 添加错误样式
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: var(--accent-color);
            font-size: 14px;
            margin-top: 5px;
        }
        
        .error {
            border-color: var(--accent-color) !important;
        }
    `;
    
    if (!document.head.querySelector('style[data-error-styles]')) {
        style.setAttribute('data-error-styles', '');
        document.head.appendChild(style);
    }
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showFormSuccess() {
    const contactForm = document.querySelector('.contact-form');
    const formElements = contactForm.querySelectorAll('input, textarea, button');
    
    // 禁用表单元素
    formElements.forEach(el => el.disabled = true);
    
    // 创建成功消息
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>消息发送成功！</h3>
        <p>感谢您的留言，我们将尽快回复您。</p>
    `;
    
    // 添加成功消息样式
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            text-align: center;
            padding: 30px;
            background-color: rgba(0, 113, 227, 0.1);
            border-radius: var(--border-radius);
            margin-top: 20px;
            animation: fadeIn 0.5s ease-out;
        }
        
        .success-icon {
            font-size: 48px;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .success-message p {
            color: var(--secondary-color);
        }
    `;
    
    document.head.appendChild(style);
    
    // 将表单替换为成功消息
    contactForm.innerHTML = '';
    contactForm.appendChild(successMessage);
}

// 添加 CSS 动画类
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            animation: fadeInUp 0.6s forwards;
        }
        
        .resize-transition {
            transition: all 0.4s ease-out;
        }
    `;
    
    document.head.appendChild(style);
    
    // 初始化设备和连接线
    initDeviceMockup();
    setupConnectionLines();
    
    // 初始化动态背景
    initMiDynamicBackground();
}); 