// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 滚动时改变导航栏样式
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        // 滚动隐藏/显示导航栏
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

    // 初始化动态背景
    initDynamicBackground();

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

// 初始化动态背景 - 小米风格
function initDynamicBackground() {
    // 创建简洁的浮动元素 - 小米风格更简洁直接
    const floatingBg = document.querySelector('.floating-bg');
    if (!floatingBg) return;
    
    // 添加几个浮动方块（小米风格倾向于几何形状，而非过多的粒子）
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle extra-particle';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.width = `${40 + Math.random() * 80}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = `${0.1 + Math.random() * 0.15}`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.borderRadius = '4px'; // 小米风格方形圆角
        
        // 小米品牌色调
        const colors = [
            'rgba(255, 103, 0, 0.03)', // 小米橙
            'rgba(0, 193, 222, 0.02)', // 小米蓝
            'rgba(100, 100, 100, 0.02)' // 灰色
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `linear-gradient(135deg, ${color}, rgba(255, 255, 255, 0))`;
        
        floatingBg.appendChild(particle);
    }
}

// 高亮设备环 - 超炫酷效果
function highlightDeviceRing(color) {
    const deviceRing = document.querySelector('.device-ring');
    if (!deviceRing) return;
    
    // 小米风格的炫酷透明度
    const rgbaColor = color.replace('#', 'rgba(') + ', 0.15)';
    const rgbaColorFaint = color.replace('#', 'rgba(') + ', 0.08)';
    
    deviceRing.style.borderColor = rgbaColor;
    deviceRing.style.boxShadow = `0 0 80px ${rgbaColorFaint}, 0 0 30px ${rgbaColorFaint}`;
    
    // 更新伪元素的颜色和发光效果
    const style = document.createElement('style');
    style.id = 'dynamic-ring-style';
    style.textContent = `
        .device-ring::before {
            border-color: ${rgbaColor};
            box-shadow: 0 0 60px ${rgbaColorFaint}, 0 0 20px ${rgbaColorFaint};
        }
        .device-ring::after {
            border-color: ${rgbaColorFaint};
            box-shadow: 0 0 40px ${rgbaColorFaint}, 0 0 15px ${rgbaColorFaint};
        }
    `;
    
    // 移除旧样式并添加新样式
    const oldStyle = document.getElementById('dynamic-ring-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    document.head.appendChild(style);
    
    // 添加脉动效果
    deviceRing.style.animation = 'xiaomi-ring-pulse 6s ease-in-out infinite';
    deviceRing.style.animationPlayState = 'running';
}

// 重置设备环 - 恢复默认样式
function resetDeviceRing() {
    const deviceRing = document.querySelector('.device-ring');
    if (!deviceRing) return;
    
    // 恢复默认样式
    deviceRing.style.borderColor = 'rgba(255, 103, 0, 0.1)';
    deviceRing.style.boxShadow = '0 0 60px rgba(255, 103, 0, 0.08)';
    
    // 移除动态样式
    const dynamicStyle = document.getElementById('dynamic-ring-style');
    if (dynamicStyle) {
        dynamicStyle.remove();
    }
    
    // 恢复默认动画
    deviceRing.style.animation = 'xiaomi-ring-pulse 10s ease-in-out infinite';
}

// 设置连接线 - 小米风格超炫酷版
function setupConnectionLines() {
    const models = [
        { id: 'gpt4-bubble', color: '#ff6700', hoverColor: '#ff8533' }, // 小米橙色
        { id: 'claude-bubble', color: '#00c1de', hoverColor: '#33d1e8' }, // 浅蓝色
        { id: 'grok-bubble', color: '#424242', hoverColor: '#666666' }  // 深灰色
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
        
        // 计算角度和距离
        const angle = Math.atan2(bubbleCenter.y - deviceCenter.y, bubbleCenter.x - deviceCenter.x);
        const distance = Math.sqrt(
            Math.pow(bubbleCenter.x - deviceCenter.x, 2) + 
            Math.pow(bubbleCenter.y - deviceCenter.y, 2)
        );
        
        // 设置连接线的位置和旋转
        line.style.top = `${deviceCenter.y}px`;
        line.style.left = `${deviceCenter.x}px`;
        line.style.width = `${distance * 0.85}px`; 
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 0';
        
        // 设置连接线颜色
        line.style.background = `linear-gradient(90deg, 
            ${model.color}20, 
            ${model.color}30,
            transparent)`;
        
        // 超炫酷的交互效果
        bubble.addEventListener('mouseenter', () => {
            // 线条动画
            line.style.opacity = '1';
            line.style.height = '3px';
            line.style.width = `${distance * 0.9}px`;
            line.style.background = `linear-gradient(90deg, 
                ${model.hoverColor}50, 
                ${model.color}70,
                transparent)`;
            line.style.boxShadow = `0 0 30px ${model.color}50, 0 0 10px ${model.color}30`;
            line.style.transition = 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)';
            
            // 给设备添加动态变色效果
            device.style.boxShadow = `
                0 30px 60px -15px rgba(0, 0, 0, 0.5),
                0 0 40px ${model.color}40,
                inset 0 1px 3px rgba(255, 255, 255, 0.15),
                inset 0 -1px 3px rgba(0, 0, 0, 0.5)
            `;
            
            // 更改设备内部显示的点的颜色
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                const delay = index * 0.1;
                setTimeout(() => {
                    dot.style.backgroundColor = model.color;
                    dot.style.boxShadow = `0 0 20px ${model.color}`;
                    dot.style.transform = 'scale(1.3)';
                    
                    if (dot.nextElementSibling) {
                        dot.nextElementSibling.style.backgroundColor = model.hoverColor;
                        dot.nextElementSibling.style.boxShadow = `0 0 20px ${model.hoverColor}`;
                    }
                }, delay * 1000);
            });
            
            // 设备环荧光效果
            highlightDeviceRing(model.color);
            
            // 给气泡添加脉冲效果
            const bubblePulse = bubble.querySelector('.bubble-pulse');
            if (bubblePulse) {
                bubblePulse.style.opacity = '1';
                bubblePulse.style.animationDuration = '2s';
                bubblePulse.style.background = `radial-gradient(circle, ${model.color}30, transparent)`;
            }
            
            // 修改设备内的网格颜色
            const deviceGrid = document.querySelector('.device-grid');
            if (deviceGrid) {
                deviceGrid.style.backgroundImage = `
                    linear-gradient(${model.color}15 1px, transparent 1px),
                    linear-gradient(90deg, ${model.color}15 1px, transparent 1px)
                `;
                deviceGrid.style.opacity = '0.6';
                deviceGrid.style.animationDuration = '10s';
            }
            
            // 3D悬浮效果
            bubble.style.transform = 'scale(1.15) translateZ(30px)';
            bubble.style.boxShadow = `
                0 25px 45px rgba(0, 0, 0, 0.2),
                0 0 40px ${model.color}30,
                inset 0 -3px 8px rgba(0, 0, 0, 0.1),
                inset 0 3px 8px rgba(255, 255, 255, 0.9)
            `;
            bubble.style.zIndex = '10';
        });
        
        bubble.addEventListener('mouseleave', () => {
            // 重置线条效果
            line.style.opacity = '0';
            line.style.width = `${distance * 0.85}px`;
            line.style.height = '2px';
            line.style.background = `linear-gradient(90deg, 
                ${model.color}20, 
                ${model.color}30,
                transparent)`;
            line.style.boxShadow = 'none';
            
            // 重置设备效果
            device.style.boxShadow = `
                0 25px 50px -10px rgba(0, 0, 0, 0.5),
                0 0 30px rgba(255, 103, 0, 0.15),
                inset 0 1px 2px rgba(255, 255, 255, 0.1),
                inset 0 -1px 2px rgba(0, 0, 0, 0.5)
            `;
            
            // 重置点的颜色
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.backgroundColor = '';
                dot.style.boxShadow = '';
                dot.style.transform = '';
            });
            
            // 重置环形光晕
            resetDeviceRing();
            
            // 重置气泡脉冲
            const bubblePulse = bubble.querySelector('.bubble-pulse');
            if (bubblePulse) {
                bubblePulse.style.opacity = '0';
                bubblePulse.style.animationDuration = '4s';
            }
            
            // 重置设备网格
            const deviceGrid = document.querySelector('.device-grid');
            if (deviceGrid) {
                deviceGrid.style.backgroundImage = '';
                deviceGrid.style.opacity = '0.3';
                deviceGrid.style.animationDuration = '20s';
            }
            
            // 重置气泡样式
            bubble.style.transform = '';
            bubble.style.boxShadow = '';
            bubble.style.zIndex = '1';
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
    initDynamicBackground();
}); 