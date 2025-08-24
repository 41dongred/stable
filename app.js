const { useState, useEffect } = React;

// Snackbar Component
const Snackbar = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div className={`snackbar ${show ? 'show' : ''}`}>
            {message}
        </div>
    );
};

// Simple Splash Screen Component
const SplashScreen = ({ onComplete }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // 페이드인 효과
        const animationTimer = setTimeout(() => {
            setOpacity(1);
        }, 100);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(animationTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="splash-screen-3d">
            <div className="splash-background">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </div>
            <div 
                className="logo-simple"
                style={{
                    opacity: opacity,
                    transition: 'opacity 1s ease'
                }}
            >
                <div className="logo-text">STC</div>
                <div className="logo-subtitle">Stable Travel Coin</div>
            </div>
            <div className="loading-bar">
                <div className="loading-progress"></div>
            </div>
        </div>
    );
};

// Social Login Buttons Component
const SocialLoginButtons = ({ onSocialLogin }) => {
    const socialProviders = [
        { name: 'kakao', label: 'KAKAO', icon: 'chat', color: '#FEE500', textColor: '#000' },
        { name: 'facebook', label: 'Facebook', icon: 'facebook', color: '#1877F2', textColor: '#fff' },
        { name: 'line', label: 'Line', icon: 'L', color: '#00B900', textColor: '#fff' },
        { name: 'google', label: 'Google', icon: 'G', color: '#fff', textColor: '#000' }
    ];

    return (
        <div className="social-login-container">
            <div className="social-login-title">간편로그인</div>
            <div className="social-login-buttons">
                {socialProviders.map(provider => (
                    <button
                        key={provider.name}
                        className="social-login-button"
                        style={{
                            backgroundColor: provider.color,
                            color: provider.textColor,
                            border: provider.name === 'google' ? '1px solid #ddd' : 'none'
                        }}
                        onClick={() => onSocialLogin(provider.name)}
                    >
                        <span className={`social-icon ${provider.name === 'line' || provider.name === 'google' ? 'text-icon' : 'material-icons'}`}>
                            {provider.icon}
                        </span>
                        <span>{provider.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Chart Component for Stable Travel Coin (Professional Line Chart Style)
const StableCoinChart = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [chartData] = useState([
        { date: '8/18', value: 131 },
        { date: '8/19', value: 130 },
        { date: '8/20', value: 129},
        { date: '8/21', value: 129 },
        { date: '8/22', value: 128 },
        { date: '8/23', value: 129 },
        { date: '8/24', value: 130 }
    ]);

    const currentPrice = chartData[chartData.length - 1].value;



    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));
    const priceChange = chartData[chartData.length - 1].value - chartData[chartData.length - 2].value;
    const priceChangePercent = ((priceChange / chartData[chartData.length - 2].value) * 100).toFixed(2);

    // 차트 크기 설정
    const chartWidth = 600;
    const chartHeight = 200;
    const padding = 40;

    // 실제 차트 영역 계산
    const plotWidth = chartWidth - (padding * 2);
    const plotHeight = chartHeight - (padding * 2);

    // 라인 차트를 위한 경로 생성
    const generatePath = () => {
        const points = chartData.map((data, index) => {
            const x = padding + (index / (chartData.length - 1)) * plotWidth;
            const y = padding + plotHeight - ((data.value - minValue) / (maxValue - minValue)) * plotHeight;
            return `${x},${y}`;
        });
        return `M ${points.join(' L ')}`;
    };

    return (
        <div className="chart-container">
            <div 
                className="chart-header-clickable"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}
            >
                <h3>Stable Travel Coin</h3>
                <span className="material-icons" style={{ 
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: '#64748b'
                }}>
                    expand_more
                </span>
            </div>
            {isExpanded && (
            <div className="chart">
                <div className="chart-header">
                    <div className="chart-price">₩{currentPrice.toLocaleString()}</div>
                    <div className={`chart-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent}%)
                    </div>
                </div>
                
                <div className="line-chart">
                    <svg width="100%" height="100" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#667eea" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#667eea" stopOpacity="0.05"/>
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#667eea"/>
                                <stop offset="100%" stopColor="#764ba2"/>
                            </linearGradient>
                        </defs>
                        
                        {/* 배경 영역 */}
                        <path
                            d={`${generatePath()} L ${chartWidth - padding},${chartHeight - padding} L ${padding},${chartHeight - padding} Z`}
                            fill="url(#areaGradient)"
                        />
                        
                        {/* 그리드 라인 */}
                        {[0, 1, 2, 3, 4].map(i => {
                            const y = padding + (i / 4) * plotHeight;
                            return (
                                <line
                                    key={i}
                                    x1={padding}
                                    y1={y}
                                    x2={chartWidth - padding}
                                    y2={y}
                                    stroke="#e2e8f0"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                    opacity="0.5"
                                />
                            );
                        })}
                        
                        {/* 메인 라인 */}
                        <path
                            d={generatePath()}
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))"
                        />
                        
                        {/* 포인트들 */}
                        {chartData.map((data, index) => {
                            const x = padding + (index / (chartData.length - 1)) * plotWidth;
                            const y = padding + plotHeight - ((data.value - minValue) / (maxValue - minValue)) * plotHeight;
                            return (
                                <g key={index}>
                                    {/* 포인트 배경 */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="6"
                                        fill="white"
                                        stroke="#667eea"
                                        strokeWidth="2"
                                        className="chart-point"
                                    />
                                    {/* 포인트 중심 */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="3"
                                        fill="#667eea"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
                
                <div className="chart-timeline">
                    {chartData.map((data, index) => (
                        <span key={index}>{data.date}</span>
                    ))}
                </div>
            </div>
            )}
            
            {isExpanded && (
            <div className="chart-stats">
                <div className="stat">
                    <div className="stat-label">최고가</div>
                    <div className="stat-value">₩{maxValue.toLocaleString()}</div>
                </div>
                <div className="stat">
                    <div className="stat-label">최저가</div>
                    <div className="stat-value">₩{minValue.toLocaleString()}</div>
                </div>
                <div className="stat">
                    <div className="stat-label">변동률</div>
                    <div className={`stat-value ${priceChange >= 0 ? 'positive' : ''}`}>
                        {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

// Quick Login Options Component
const QuickLoginOptions = ({ onFaceAuth, onFingerprint, onQuickLogin }) => {
    const handleFaceAuth = () => {
        onFaceAuth();
    };

    const handleFingerprint = () => {
        // Touch ID 시뮬레이션
        setTimeout(() => {
            onQuickLogin('Touch ID');
        }, 1000);
    };

    return (
        <div className="quick-login-options">
            <button className="quick-login-button" onClick={handleFaceAuth}>
                <span className="material-icons">face</span>
                <span>Face ID</span>
            </button>
            <button className="quick-login-button" onClick={handleFingerprint}>
                <span className="material-icons">fingerprint</span>
                <span>Touch ID</span>
            </button>
        </div>
    );
};

// Face Authentication Component
const FaceAuth = ({ onSuccess, onCancel }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        if (isScanning) {
            const interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        setIsScanning(false);
                        onSuccess();
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [isScanning, onSuccess]);

    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
    };

    return (
        <div className="face-auth-overlay">
            <div className="face-auth-modal">
                <div className="face-auth-header">
                    <h3>Face ID</h3>
                    <button className="close-button" onClick={onCancel}>×</button>
                </div>
                
                <div className="face-scan-area">
                    <div className="face-frame">
                        <div className="scan-line" style={{ top: `${scanProgress}%` }}></div>
                        {!isScanning && (
                            <div className="face-placeholder">
                                <span className="material-icons">face</span>
                                <p>Position your face in the frame</p>
                            </div>
                        )}
                        {isScanning && (
                            <div className="scanning-indicator">
                                <div className="scanning-dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                                <p>Recognizing face... {scanProgress}%</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="face-auth-actions">
                    {!isScanning ? (
                        <button className="material-button secondary" onClick={startScan}>
                            Start Face ID
                        </button>
                    ) : (
                        <button className="material-button outlined" onClick={() => setIsScanning(false)}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Login Component with Social Login and Quick Login Options
const Login = ({ onLogin, onSwitchToSignup, onSocialLogin, onFaceAuth, onQuickLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin();
        }
    };

    const handleSocialLogin = (provider) => {
        onSocialLogin(provider);
    };

    const handleFaceAuth = () => {
        onFaceAuth();
    };

    const handleFingerprint = () => {
        onSocialLogin('fingerprint');
    };

    return (
        <div className="page">
            <div className="app-bar">
                <h1>Stable Travel Card</h1>
            </div>
            <div className="form-container">
                <h2 className="form-title">로그인</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="material-textfield"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="material-textfield"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="material-button" style={{ width: '100%' }}>
                        로그인
                    </button>
                </form>
                
                <QuickLoginOptions 
                    onFaceAuth={handleFaceAuth} 
                    onFingerprint={handleFingerprint} 
                    onQuickLogin={onQuickLogin}
                />
                
                <SocialLoginButtons onSocialLogin={handleSocialLogin} />
                
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button 
                        className="material-button outlined" 
                        onClick={onSwitchToSignup}
                        style={{ width: '100%' }}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

// Signup Component with Social Login
const Signup = ({ onSignup, onSwitchToLogin, onSocialLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        if (name && email && password) {
            onSignup();
        }
    };

    const handleSocialSignup = (provider) => {
        onSocialLogin(provider);
    };

    return (
        <div className="page">
            <div className="app-bar">
                <h1>회원가입</h1>
            </div>
            <div className="form-container">
                <h2 className="form-title">새 계정 만들기</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        className="material-textfield"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="material-textfield"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="material-textfield"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="material-button" style={{ width: '100%' }}>
                        회원가입
                    </button>
                </form>
                
                <SocialLoginButtons onSocialLogin={handleSocialSignup} />
                
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button 
                        className="material-button outlined" 
                        onClick={onSwitchToLogin}
                        style={{ width: '100%' }}
                    >
                        로그인으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

// Home Dashboard Component with Chart and Limited Recent Transactions
const HomeDashboard = ({ balance, onNavigate, recentTransactions }) => {
    const formatBalance = (amount) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    };

    // 최근 거래 내역을 2개로 제한 (내역 탭과 동일한 데이터 사용)
    const limitedTransactions = recentTransactions.slice(0, 2);

    return (
        <div className="page">
            <div className="app-bar">
                <h1>Stable Travel Card</h1>
                <span 
                    className="material-icons" 
                    onClick={() => onNavigate('profile')}
                    style={{ cursor: 'pointer' }}
                >
                    account_circle
                </span>
            </div>
            
            <div className="balance-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <div className="balance-label">총 보유자산</div>
                        <div className="balance-amount">₩{formatBalance(balance)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>24시간 변동</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>+₩12,500 (+2.1%)</div>
                    </div>
                </div>
                <div className="action-buttons">
                    <button 
                        className="material-button secondary"
                        onClick={() => onNavigate('topup')}
                        style={{ flex: 1, marginRight: '8px' }}
                    >
                        충전하기
                    </button>
                    <button 
                        className="material-button outlined"
                        onClick={() => onNavigate('transactions')}
                        style={{ flex: 1, marginLeft: '8px' }}
                    >
                        결제내역
                    </button>
                </div>
            </div>

            <div className="material-card">
                <StableCoinChart />
            </div>

            <div className="material-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3>스테이킹</h3>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>APY: 8.5%</div>
                </div>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                        ₩{formatBalance(balance * 0.3)}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                        스테이킹 가능 금액 (보유 자산의 30%)
                    </div>
                    <button 
                        className="material-button secondary"
                        onClick={() => onNavigate('staking')}
                        style={{ width: '100%' }}
                    >
                        스테이킹하기
                    </button>
                </div>
            </div>

            <div className="material-card">
                <h3>최근 거래</h3>
                {limitedTransactions.length > 0 ? (
                    limitedTransactions.map((transaction, index) => (
                        <div key={index} className="transaction-item">
                            <div className="transaction-info">
                                <div>{transaction.description}</div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>{transaction.date}</div>
                            </div>
                            <div className={`transaction-amount ${transaction.type}`}>
                                {transaction.type === 'positive' ? '+' : '-'}{transaction.amount}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-transactions">
                        <span className="material-icons">receipt_long</span>
                        <p>최근 거래 내역이 없습니다</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Top-up Component
const Topup = ({ onNavigate, onTopup }) => {
    const [amount, setAmount] = useState(100000);
    const [conversionRate] = useState(1.35); // KRW to USDC rate
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleTopup = () => {
        setIsProcessing(true);
        setProgress(0);
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    onTopup(amount);
                    onNavigate('home');
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const formatAmount = (value) => {
        return new Intl.NumberFormat('ko-KR').format(value);
    };

    return (
        <div className="page">
            <div className="app-bar">
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('home')}
                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    뒤로
                </button>
                <h1>충전하기</h1>
                <div></div>
            </div>
            
            <div className="form-container">
                <h2 className="form-title">원화 충전</h2>
                
                <div className="conversion-rate">
                    <div>KRW ↔ USDC 변환 비율</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}>
                        1 USDC = ₩{conversionRate.toFixed(2)}
                    </div>
                </div>

                <div className="slider-container">
                    <label>충전 금액: ₩{formatAmount(amount)}</label>
                    <input
                        type="range"
                        className="slider"
                        min="10000"
                        max="1000000"
                        step="10000"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                        <span>₩10,000</span>
                        <span>₩1,000,000</span>
                    </div>
                </div>

                <div className="material-card">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', color: '#666' }}>충전 후 USDC</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3f51b5', marginBottom: '16px' }}>
                            {(amount / conversionRate).toFixed(2)} USDC
                        </div>
                    </div>
                </div>

                {isProcessing ? (
                    <div className="material-card" style={{ textAlign: 'center', marginTop: '24px' }}>
                        <div className="material-icons" style={{ fontSize: '48px', color: '#10b981', marginBottom: '16px' }}>
                            sync
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                            충전 처리 중...
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                            {progress}% 완료
                        </div>
                        <div style={{ 
                            width: '100%', 
                            height: '8px', 
                            backgroundColor: '#e2e8f0', 
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: '16px'
                        }}>
                            <div style={{ 
                                width: `${progress}%`, 
                                height: '100%', 
                                backgroundColor: '#10b981',
                                transition: 'width 0.2s ease'
                            }}></div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                            KRW → USDC 변환 중
                        </div>
                    </div>
                ) : (
                    <button 
                        className="material-button secondary"
                        onClick={handleTopup}
                        style={{ width: '100%', marginTop: '24px' }}
                    >
                        충전하기
                    </button>
                )}
            </div>
        </div>
    );
};

// Payment Simulation Component
const Payment = ({ onNavigate, onPayment }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentAmount] = useState(50);
    const [exchangeRate] = useState(1480);

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onPayment(paymentAmount, exchangeRate);
            onNavigate('home');
        }, 2000);
    };

    return (
        <div className="page">
            <div className="app-bar">
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('home')}
                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    뒤로
                </button>
                <h1>결제</h1>
                <div></div>
            </div>
            
            <div className="form-container">
                <h2 className="form-title">해외 결제 시뮬레이션</h2>
                
                <div className="material-card">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', marginBottom: '8px' }}>결제 금액</div>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#3f51b5' }}>
                            €{paymentAmount}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginTop: '8px', marginBottom: '16px' }}>
                            환율: 1 EUR = ₩{exchangeRate.toLocaleString()}
                        </div>
                    </div>
                </div>

                {isProcessing ? (
                    <div className="material-card" style={{ textAlign: 'center' }}>
                        <div className="material-icons" style={{ fontSize: '48px', color: '#3f51b5', marginBottom: '16px' }}>
                            sync
                        </div>
                        <div style={{ marginBottom: '16px' }}>현지 통화로 변환 중...</div>
                    </div>
                ) : (
                    <button 
                        className="material-button secondary"
                        onClick={handlePayment}
                        style={{ width: '100%' }}
                    >
                        결제하기
                    </button>
                )}
            </div>
        </div>
    );
};

// Transactions Component
const Transactions = ({ onNavigate, transactions, stakingHistory }) => {

    return (
        <div className="page">
            <div className="app-bar">
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('home')}
                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    뒤로
                </button>
                <h1>거래 내역</h1>
                <div></div>
            </div>
            
            <div className="material-card">
                <h3>결제 내역</h3>
                {transactions.map((transaction, index) => (
                    <div key={index} className="transaction-item">
                        <div className="transaction-info">
                            <div>{transaction.description}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{transaction.date}</div>
                        </div>
                        <div className={`transaction-amount ${transaction.type}`}>
                            {transaction.type === 'positive' ? '+' : '-'}{transaction.amount}
                        </div>
                    </div>
                ))}
            </div>

            <div className="material-card">
                <h3>스테이킹 내역</h3>
                {stakingHistory.map((item, index) => (
                    <div key={index} className="transaction-item">
                        <div className="transaction-info">
                            <div>스테이킹</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{item.date}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                {item.amount}
                            </div>
                            <div style={{ fontSize: '12px', color: '#10b981' }}>
                                +{item.earned} 수익
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Staking Component
const Staking = ({ onNavigate, balance, onStaking, stakingHistory }) => {
    const [stakingAmount, setStakingAmount] = useState(balance * 0.3);
    const [isStaking, setIsStaking] = useState(false);

    const handleStaking = () => {
        setIsStaking(true);
        setTimeout(() => {
            setIsStaking(false);
            onStaking(stakingAmount);
            onNavigate('home');
        }, 2000);
    };

    const formatAmount = (value) => {
        return new Intl.NumberFormat('ko-KR').format(value);
    };

    return (
        <div className="page">
            <div className="app-bar">
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('home')}
                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    뒤로
                </button>
                <h1>스테이킹</h1>
                <div></div>
            </div>
            
            <div className="material-card">
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>현재 APY</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>
                        8.5%
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                        연간 수익률
                    </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>스테이킹 금액</span>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>
                            ₩{formatAmount(stakingAmount)}
                        </span>
                    </div>
                    <input
                        type="range"
                        className="slider"
                        min="0"
                        max={balance * 0.3}
                        step="10000"
                        value={stakingAmount}
                        onChange={(e) => setStakingAmount(parseInt(e.target.value))}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                        <span>₩0</span>
                        <span>₩{formatAmount(balance * 0.3)}</span>
                    </div>
                </div>

                {isStaking ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div className="material-icons" style={{ fontSize: '48px', color: '#10b981', marginBottom: '16px' }}>
                            sync
                        </div>
                        <div>스테이킹 처리 중...</div>
                    </div>
                ) : (
                    <button 
                        className="material-button secondary"
                        onClick={handleStaking}
                        style={{ width: '100%', marginBottom: '24px' }}
                        disabled={stakingAmount === 0}
                    >
                        스테이킹 시작
                    </button>
                )}
            </div>
        </div>
    );
};

// Profile Component
const Profile = ({ onNavigate, balance }) => {
    const [userInfo] = useState({
        name: '김스테이블',
        email: 'stable@example.com',
        phone: '010-1234-5678',
        joinDate: '2024.01.01',
        totalStaking: '₩350,000',
        totalEarned: '₩2,485',
        level: 'Gold'
    });

    return (
        <div className="page">
            <div className="app-bar">
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('home')}
                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    뒤로
                </button>
                <h1>내 정보</h1>
                <div></div>
            </div>
            
            <div className="material-card">
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div className="material-icons" style={{ fontSize: '64px', color: '#667eea', marginBottom: '16px' }}>
                        account_circle
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                        {userInfo.name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                        {userInfo.email}
                    </div>
                    <div style={{ 
                        display: 'inline-block', 
                        padding: '4px 12px', 
                        backgroundColor: '#fbbf24', 
                        color: 'white', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        {userInfo.level} 등급
                    </div>
                </div>
            </div>

            <div className="material-card">
                <h3>계정 정보</h3>
                <div className="settings-item">
                    <div>
                        <div>이름</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{userInfo.name}</div>
                    </div>
                    <span className="material-icons">chevron_right</span>
                </div>
                
                <div className="settings-item">
                    <div>
                        <div>이메일</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{userInfo.email}</div>
                    </div>
                    <span className="material-icons">chevron_right</span>
                </div>
                
                <div className="settings-item">
                    <div>
                        <div>전화번호</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{userInfo.phone}</div>
                    </div>
                    <span className="material-icons">chevron_right</span>
                </div>
                
                <div className="settings-item">
                    <div>
                        <div>가입일</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{userInfo.joinDate}</div>
                    </div>
                </div>
            </div>

            <div className="material-card">
                <h3>스테이킹 현황</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>총 스테이킹</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                            {userInfo.totalStaking}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>총 수익</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                            {userInfo.totalEarned}
                        </div>
                    </div>
                </div>
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('staking')}
                    style={{ width: '100%' }}
                >
                    스테이킹 관리
                </button>
            </div>
        </div>
    );
};

// Settings Component with Face Authentication
const Settings = ({ onNavigate, settings, onSettingChange, onFaceAuth }) => {
    const [showFaceAuth, setShowFaceAuth] = useState(false);

    const handleFaceAuthSuccess = () => {
        setShowFaceAuth(false);
        onSettingChange('faceAuth', true);
    };

    return (
        <div className="page">
            <div className="app-bar">
                <button 
                    className="material-button outlined"
                    onClick={() => onNavigate('home')}
                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    뒤로
                </button>
                <h1>설정</h1>
                <div></div>
            </div>
            
            <div className="material-card">
                <div className="settings-item">
                    <div>
                        <div>언어 설정</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>한국어</div>
                    </div>
                    <span className="material-icons">chevron_right</span>
                </div>
                
                <div className="settings-item">
                    <div>
                        <div>결제 알림</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>결제 시 알림 받기</div>
                    </div>
                    <div 
                        className={`switch ${settings.paymentNotifications ? 'active' : ''}`}
                        onClick={() => onSettingChange('paymentNotifications', !settings.paymentNotifications)}
                    ></div>
                </div>
                
                <div className="settings-item">
                    <div>
                        <div>환율 알림</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>환율 변동 시 알림</div>
                    </div>
                    <div 
                        className={`switch ${settings.exchangeRateNotifications ? 'active' : ''}`}
                        onClick={() => onSettingChange('exchangeRateNotifications', !settings.exchangeRateNotifications)}
                    ></div>
                </div>
                
                <div className="settings-item">
                    <div>
                        <div>지문 인증</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>결제 시 지문 인증</div>
                    </div>
                    <div 
                        className={`switch ${settings.fingerprintAuth ? 'active' : ''}`}
                        onClick={() => onSettingChange('fingerprintAuth', !settings.fingerprintAuth)}
                    ></div>
                </div>

                <div className="settings-item">
                    <div>
                        <div>얼굴 인증</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            {settings.faceAuth ? '활성화됨' : '비활성화됨'}
                        </div>
                    </div>
                    <button 
                        className="material-button small"
                        onClick={() => setShowFaceAuth(true)}
                        style={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                        {settings.faceAuth ? '재설정' : '설정'}
                    </button>
                </div>
            </div>

            {showFaceAuth && (
                <FaceAuth 
                    onSuccess={handleFaceAuthSuccess}
                    onCancel={() => setShowFaceAuth(false)}
                />
            )}
        </div>
    );
};

// Bottom Navigation Component
const BottomNavigation = ({ currentPage, onNavigate }) => {
    const navItems = [
        { id: 'home', label: '홈', icon: 'home' },
        { id: 'staking', label: '스테이킹', icon: 'trending_up' },
        { id: 'payment', label: '결제', icon: 'payment' },
        { id: 'transactions', label: '내역', icon: 'receipt_long' },
        { id: 'settings', label: '설정', icon: 'settings' }
    ];

    return (
        <div className="bottom-nav">
            {navItems.map(item => (
                <div 
                    key={item.id}
                    className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                >
                    <span className="material-icons">{item.icon}</span>
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('splash');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [balance, setBalance] = useState(1250000);
    const [transactions, setTransactions] = useState([
        { description: '파리 카페', amount: '€15.50', type: 'negative', date: '2024.01.15' },
        { description: '충전', amount: '₩500,000', type: 'positive', date: '2024.01.14' }
    ]);
    const [settings, setSettings] = useState({
        paymentNotifications: true,
        exchangeRateNotifications: false,
        fingerprintAuth: true,
        faceAuth: false
    });
    const [snackbar, setSnackbar] = useState({ show: false, message: '' });
    const [showFaceAuth, setShowFaceAuth] = useState(false);
    const [stakingHistory, setStakingHistory] = useState([
        { date: '2024.01.15', amount: '₩200,000', apy: '8.5%', earned: '₩1,420' },
        { date: '2024.01.10', amount: '₩150,000', apy: '8.5%', earned: '₩1,065' }
    ]);

    // 최근 7일 거래 내역 필터링 (내역 탭과 동일한 로직)
    const getRecentTransactions = () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date.replace(/\./g, '-'));
            return transactionDate >= oneWeekAgo;
        });
    };

    // 모든 거래 내역 (내역 탭용)
    const getAllTransactions = () => {
        return transactions;
    };

    const showSnackbar = (message) => {
        setSnackbar({ show: true, message });
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        setCurrentPage('home');
        showSnackbar('로그인 성공!');
    };

    const handleSignup = () => {
        setIsLoggedIn(true);
        setCurrentPage('home');
        showSnackbar('회원가입 완료!');
    };

    const handleSocialLogin = (provider) => {
        setIsLoggedIn(true);
        setCurrentPage('home');
        showSnackbar(`${provider} 로그인 성공!`);
    };

    const handleFaceAuth = () => {
        setShowFaceAuth(true);
    };

    const handleFaceAuthSuccess = () => {
        setShowFaceAuth(false);
        setIsLoggedIn(true);
        setCurrentPage('home');
        showSnackbar('얼굴인증 로그인 성공!');
    };

    const handleQuickLogin = (method) => {
        setIsLoggedIn(true);
        setCurrentPage('home');
        showSnackbar(`${method} 로그인 성공!`);
    };

    const handleTopup = (amount) => {
        const today = new Date().toLocaleDateString('ko-KR');
        setBalance(prev => prev + amount);
        setTransactions(prev => [
            { description: '충전', amount: `₩${amount.toLocaleString()}`, type: 'positive', date: today },
            ...prev
        ]);
        showSnackbar('충전 완료!');
    };

    const handleStaking = (amount) => {
        const today = new Date().toLocaleDateString('ko-KR');
        const earned = Math.round(amount * 0.085 / 365); // 일일 수익 계산 (8.5% APY)
        
        setStakingHistory(prev => [
            { 
                date: today, 
                amount: `₩${amount.toLocaleString()}`, 
                apy: '8.5%', 
                earned: `₩${earned.toLocaleString()}` 
            },
            ...prev
        ]);
        showSnackbar('스테이킹 완료!');
    }; 

    const handlePayment = (amount, exchangeRate) => {
        const krwAmount = amount * exchangeRate;
        const today = new Date().toLocaleDateString('ko-KR');
        setBalance(prev => prev - krwAmount);
        setTransactions(prev => [
            { description: '해외 결제', amount: `€${amount}`, type: 'negative', date: today },
            ...prev
        ]);
        showSnackbar(`${amount} EUR 결제 완료 \n(환율: ${exchangeRate}원/EUR)`);
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        showSnackbar('설정이 저장되었습니다.');
    };

    const renderPage = () => {
        if (currentPage === 'splash') {
            return <SplashScreen onComplete={() => setCurrentPage('login')} />;
        }
        
        if (!isLoggedIn) {
            if (currentPage === 'signup') {
                return <Signup onSignup={handleSignup} onSwitchToLogin={() => setCurrentPage('login')} onSocialLogin={handleSocialLogin} />;
            }
            return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('login')} onSocialLogin={handleSocialLogin} onFaceAuth={handleFaceAuth} onQuickLogin={handleQuickLogin} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomeDashboard balance={balance} onNavigate={handleNavigate} recentTransactions={getAllTransactions()} />;
            case 'topup':
                return <Topup onNavigate={handleNavigate} onTopup={handleTopup} />;
            case 'payment':
                return <Payment onNavigate={handleNavigate} onPayment={handlePayment} />;
            case 'staking':
                return <Staking onNavigate={handleNavigate} balance={balance} onStaking={handleStaking} stakingHistory={stakingHistory} />;
            case 'profile':
                return <Profile onNavigate={handleNavigate} balance={balance} />;
            case 'transactions':
                return <Transactions onNavigate={handleNavigate} transactions={getAllTransactions()} stakingHistory={stakingHistory} />;
            case 'settings':
                return <Settings onNavigate={handleNavigate} settings={settings} onSettingChange={handleSettingChange} />;
            default:
                return <HomeDashboard balance={balance} onNavigate={handleNavigate} recentTransactions={getAllTransactions()} />;
        }
    };

    return (
        <div className="app-container">
            {renderPage()}
            {isLoggedIn && currentPage !== 'splash' && currentPage !== 'login' && currentPage !== 'signup' && (
                <BottomNavigation currentPage={currentPage} onNavigate={handleNavigate} />
            )}
            {showFaceAuth && (
                <FaceAuth 
                    onSuccess={handleFaceAuthSuccess}
                    onCancel={() => setShowFaceAuth(false)}
                />
            )}
            <Snackbar 
                message={snackbar.message} 
                show={snackbar.show} 
                onClose={() => setSnackbar({ show: false, message: '' })} 
            />
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));


