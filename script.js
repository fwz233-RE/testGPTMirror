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
            
            // 添加自定义提示内容
            const cardText = this.querySelector('h3').textContent;
            let hintText = '';
            
            if (cardText.includes('多平台账号')) {
                hintText = '';
            } else if (cardText.includes('错峰')) {
                hintText = '';
            } else if (cardText.includes('性价比')) {
                hintText = '';
            } else if (cardText.includes('稳定')) {
                hintText = '';
            }
            
            if (hintText) {
                const hint = document.createElement('div');
                hint.className = 'feature-hint';
                hint.textContent = hintText;
                this.appendChild(hint);
                
                // 自动淡入提示
                setTimeout(() => {
                    hint.style.opacity = '1';
                }, 50);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            icon.style.transform = '';
            icon.style.color = '';
            
            // 移除提示
            const hint = this.querySelector('.feature-hint');
            if (hint) {
                hint.style.opacity = '0';
                setTimeout(() => {
                    if (hint.parentNode === this) {
                        this.removeChild(hint);
                    }
                }, 300);
            }
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
    
    // 添加账号共享平台相关元素和动画
    addAccountSharingElements();
    
    // 添加模型卡片样式
    addModelCardsStyles();
    
    // 初始化模型卡片点击事件
    initModelCardInteractions();
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
            
            .feature-hint {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(255, 103, 0, 0.95);
                color: white;
                padding: 10px;
                border-radius: 0 0 var(--border-radius) var(--border-radius);
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 10;
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

// 添加账号共享平台相关元素和动画
function addAccountSharingElements() {
    // 添加账号共享相关样式
    const style = document.createElement('style');
    style.textContent = `
        .account-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--accent-color);
            color: white;
            font-size: 12px;
            padding: 3px 8px;
            border-radius: 12px;
            z-index: 10;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .shared-account-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #4CAF50;
            border-radius: 50%;
            margin-right: 5px;
            animation: pulse 2s infinite;
        }
        
        @keyframes account-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    
    // 为模型卡片添加账号徽章
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        const badge = document.createElement('div');
        badge.className = 'account-badge';
        badge.innerHTML = '<span class="shared-account-indicator"></span>账号共享';
        card.appendChild(badge);
    });
    
    // 添加错峰使用动画效果到价格卡片
    const pricingCard = document.querySelector('.pricing-card');
    if (pricingCard) {
        const peakHoursDesc = document.createElement('div');
        peakHoursDesc.className = 'peak-hours-desc';
        peakHoursDesc.innerHTML = `
            <h4>智能错峰技术</h4>
            <div class="usage-timeline">
                <div class="timeline-bar">
                    <div class="timeline-progress"></div>
                </div>
                <div class="timeline-labels">
                    <span>0:00</span>
                    <span>8:00</span>
                    <span>16:00</span>
                    <span>24:00</span>
                </div>
            </div>
            <p>系统智能分配账号使用时间，高峰期保证资源充足</p>
        `;
        
        const features = pricingCard.querySelector('.pricing-features');
        if (features) {
            features.appendChild(peakHoursDesc);
            
            // 添加样式
            const timelineStyle = document.createElement('style');
            timelineStyle.textContent = `
                .peak-hours-desc {
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px dashed rgba(0,0,0,0.1);
                }
                
                .peak-hours-desc h4 {
                    font-size: 16px;
                    margin-bottom: 10px;
                    color: var(--primary-color);
                }
                
                .usage-timeline {
                    margin: 15px 0;
                }
                
                .timeline-bar {
                    height: 8px;
                    background: rgba(0,0,0,0.05);
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                }
                
                .timeline-progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 30%;
                    background: var(--accent-color);
                    border-radius: 4px;
                    animation: timeline-move 10s infinite linear;
                }
                
                .timeline-labels {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    font-size: 12px;
                    color: var(--secondary-color);
                }
                
                @keyframes timeline-move {
                    0% { left: -30%; }
                    100% { left: 100%; }
                }
            `;
            
            document.head.appendChild(timelineStyle);
        }
    }
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

// 初始化模型卡片交互
function initModelCardInteractions() {
    const modelCards = document.querySelectorAll('.model-card-simple');
    const dialogContainer = document.getElementById('aiDialogContainer');
    const dialogClose = document.getElementById('aiDialogClose');
    const aiDialogAvatar = document.getElementById('aiDialogAvatar');
    const aiDialogTitle = document.getElementById('aiDialogTitle');
    const aiChatMessages = document.getElementById('aiChatMessages');
    
    // 模型信息
    const modelIntroductions = {
        gpt: "我是OpenAI的O1 Pro模型，拥有强大的多模态能力，支持Deep Research深度分析，并可以进行网络信息的推理。",
        claude: "我是Anthropic的Claude 3.7模型，擅长推理，特别在编程方面表现出色，支持处理大量上下文内容。",
        grok: "我是xAI的Grok 3模型，拥有实时互联网访问能力，可以为您提供最新信息，并擅长解决技术问题和数据分析。"
    };
    
    // 模型图标
    const modelIcons = {
        gpt: '<i class="fas fa-robot"></i>',
        claude: '<i class="fas fa-brain"></i>',
        grok: '<i class="fas fa-rocket"></i>'
    };
    
    // 模型名称
    const modelNames = {
        gpt: "O1 Pro",
        claude: "Claude 3.7",
        grok: "Grok 3"
    };
    
    // 模型颜色
    const modelColors = {
        gpt: "#10a37f",
        claude: "#8a2be2",
        grok: "#eb5757"
    };
    
    // 添加点击效果到模型卡片
    modelCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 添加波纹动画
            addRippleEffect(this, e);
            
            // 添加点击动画类
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 600);
            
            // 获取模型类型
            const modelType = this.dataset.model;
            
            // 设置对话框标题和图标
            aiDialogTitle.textContent = modelNames[modelType];
            aiDialogAvatar.innerHTML = modelIcons[modelType];
            aiDialogAvatar.style.background = modelColors[modelType];
            
            // 清空之前的内容
            aiChatMessages.innerHTML = '';
            
            // 创建Transformer动画容器
            const transformerContainer = document.createElement('div');
            transformerContainer.className = 'transformer-animation-container';
            aiChatMessages.appendChild(transformerContainer);
            
            // 创建模型介绍文本元素
            const introTextElement = document.createElement('div');
            introTextElement.className = 'model-intro-text';
            introTextElement.textContent = '';
            aiChatMessages.appendChild(introTextElement);
            
            // 显示对话框
            dialogContainer.classList.add('show');
            
            // 创建并显示Transformer动画
            createTransformerAnimation(transformerContainer, modelType, modelColors[modelType]);
            
            // 设置卡片发光效果
            this.classList.add('show-glow');
            
            // 打字机效果显示介绍文本
            typeWriterEffect(introTextElement, modelIntroductions[modelType], 30);
        });
    });
    
    // 关闭对话框
    dialogClose.addEventListener('click', function() {
        dialogContainer.classList.remove('show');
        // 移除所有卡片的发光效果
        modelCards.forEach(card => {
            card.classList.remove('show-glow');
        });
    });
    
    // Transformer动画创建函数
    function createTransformerAnimation(container, modelType, color) {
        // 清空容器
        container.innerHTML = '';
        
        // 创建Transformer架构元素
        const transformerArchitecture = document.createElement('div');
        transformerArchitecture.className = 'transformer-architecture';
        
        // 创建输入嵌入层
        const inputEmbedding = document.createElement('div');
        inputEmbedding.className = 'transformer-layer input-embedding';
        inputEmbedding.innerHTML = '<div class="layer-label">输入嵌入</div>';
        transformerArchitecture.appendChild(inputEmbedding);
        
        // 创建Transformer层
        const numLayers = 6;
        const layers = [];
        
        for (let i = 0; i < numLayers; i++) {
            const layer = document.createElement('div');
            layer.className = 'transformer-layer';
            
            const selfAttention = document.createElement('div');
            selfAttention.className = 'transformer-component self-attention';
            selfAttention.innerHTML = '<div class="component-label">多头注意力</div>';
            
            const feedForward = document.createElement('div');
            feedForward.className = 'transformer-component feed-forward';
            feedForward.innerHTML = '<div class="component-label">前馈神经网络</div>';
            
            layer.appendChild(selfAttention);
            layer.appendChild(feedForward);
            transformerArchitecture.appendChild(layer);
            
            layers.push({ layer, selfAttention, feedForward });
        }
        
        // 创建输出层
        const outputLayer = document.createElement('div');
        outputLayer.className = 'transformer-layer output-layer';
        outputLayer.innerHTML = '<div class="layer-label">输出层</div>';
        transformerArchitecture.appendChild(outputLayer);
        
        // 添加到容器
        container.appendChild(transformerArchitecture);
        
        // 创建连接线
        const connectionContainer = document.createElement('div');
        connectionContainer.className = 'transformer-connections';
        container.appendChild(connectionContainer);
        
        // 创建数据点
        const dataPoints = document.createElement('div');
        dataPoints.className = 'data-points';
        container.appendChild(dataPoints);
        
        // 添加数据流动动画
        animateDataFlow(dataPoints, layers, inputEmbedding, outputLayer, connectionContainer, color);
    }
    
    // 数据流动动画
    function animateDataFlow(dataPoints, layers, inputLayer, outputLayer, connectionContainer, color) {
        // 创建20个数据点
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const dataPoint = document.createElement('div');
                dataPoint.className = 'data-point';
                dataPoint.style.backgroundColor = color;
                dataPoints.appendChild(dataPoint);
                
                // 随机起始位置
                const startX = Math.random() * 80 + 10; // 10% - 90%
                dataPoint.style.left = `${startX}%`;
                dataPoint.style.top = '0';
                
                // 动画: 输入层 -> 各Transformer层 -> 输出层
                setTimeout(() => {
                    dataPoint.style.top = inputLayer.offsetTop + (inputLayer.offsetHeight / 2) + 'px';
                    
                    // 添加闪光效果到输入层
                    inputLayer.classList.add('processing');
                    setTimeout(() => inputLayer.classList.remove('processing'), 300);
                    
                    // 通过每一层
                    layers.forEach((layerObj, index) => {
                        setTimeout(() => {
                            dataPoint.style.top = layerObj.layer.offsetTop + (layerObj.layer.offsetHeight / 2) + 'px';
                            
                            // 注意力机制闪光
                            setTimeout(() => {
                                layerObj.selfAttention.classList.add('processing');
                                
                                // 创建注意力连接线
                                createAttentionLines(connectionContainer, 3, layerObj.selfAttention, color);
                                
                                setTimeout(() => layerObj.selfAttention.classList.remove('processing'), 300);
                            }, 100);
                            
                            // 前馈网络闪光
                            setTimeout(() => {
                                layerObj.feedForward.classList.add('processing');
                                setTimeout(() => layerObj.feedForward.classList.remove('processing'), 300);
                            }, 400);
                            
                        }, 800 * (index + 1));
                    });
                    
                    // 最后到达输出层
                    setTimeout(() => {
                        dataPoint.style.top = outputLayer.offsetTop + (outputLayer.offsetHeight / 2) + 'px';
                        outputLayer.classList.add('processing');
                        setTimeout(() => {
                            outputLayer.classList.remove('processing');
                            dataPoint.style.opacity = '0';
                            setTimeout(() => dataPoint.remove(), 500);
                        }, 300);
                    }, 800 * (layers.length + 1));
                    
                }, 200);
                
            }, i * 600); // 每600ms添加一个新数据点
        }
    }
    
    // 创建注意力连接线
    function createAttentionLines(container, numLines, attentionComponent, color) {
        const componentRect = attentionComponent.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.className = 'attention-line';
            
            // 设置线的位置
            const startX = (componentRect.left - containerRect.left) + componentRect.width / 2;
            const startY = (componentRect.top - containerRect.top) + componentRect.height / 2;
            const angle = Math.random() * Math.PI * 2;
            const length = Math.random() * 50 + 30;
            
            line.style.left = `${startX}px`;
            line.style.top = `${startY}px`;
            line.style.width = `${length}px`;
            line.style.transform = `rotate(${angle}rad)`;
            line.style.backgroundColor = color;
            line.style.opacity = '0.7';
            
            container.appendChild(line);
            
            // 动画并在之后删除
            setTimeout(() => {
                line.style.opacity = '0';
                setTimeout(() => line.remove(), 300);
            }, 300);
        }
    }
    
    // 打字机效果函数
    function typeWriterEffect(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
}

// 添加波纹效果
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    element.appendChild(ripple);
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加样式
function addModelCardsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .models-simple {
            margin-bottom: 40px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
    `;
    document.head.appendChild(style);
} 