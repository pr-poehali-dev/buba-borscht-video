import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('booba');
  const [lightIntensity, setLightIntensity] = useState([75]);
  const [cameraAngle, setCameraAngle] = useState([45]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [boobaPos, setBoobaPos] = useState({ x: 0, y: 0, scale: 1 });
  const [grandmaPos, setGrandmaPos] = useState({ x: 200, y: 0, scale: 0 });
  const [showDialog, setShowDialog] = useState(false);
  const [boobaEmotion, setBoobaEmotion] = useState('😊');
  const [grandmaEmotion, setGrandmaEmotion] = useState('😠');

  const characters = [
    { id: 'booba', name: 'Буба', emoji: '🐭' },
    { id: 'grandma', name: 'Бабушка', emoji: '👵' }
  ];

  const sceneObjects = [
    { id: 'table', name: 'Стол', emoji: '🪑' },
    { id: 'borsch', name: 'Борщ', emoji: '🍲' },
    { id: 'kitchen', name: 'Кухня', emoji: '🏠' }
  ];

  const keyframes = [
    { frame: 0, action: 'Буба ест борщ', duration: '0:00' },
    { frame: 120, action: 'Бабушка входит', duration: '0:04' },
    { frame: 180, action: 'Диалог', duration: '0:06' },
    { frame: 240, action: 'Реакция Бубы', duration: '0:08' }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= 4) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    switch (animationStep) {
      case 0:
        setBoobaPos({ x: 0, y: 0, scale: 1 });
        setGrandmaPos({ x: 200, y: 0, scale: 0 });
        setShowDialog(false);
        setBoobaEmotion('😊');
        setCurrentFrame(0);
        break;
      case 1:
        setGrandmaPos({ x: 150, y: 0, scale: 1 });
        setCurrentFrame(120);
        break;
      case 2:
        setGrandmaPos({ x: 100, y: 0, scale: 1 });
        setShowDialog(true);
        setGrandmaEmotion('😠');
        setCurrentFrame(180);
        break;
      case 3:
        setBoobaEmotion('😮');
        setBoobaPos({ x: -20, y: -10, scale: 0.95 });
        setCurrentFrame(240);
        break;
      case 4:
        setBoobaPos({ x: -50, y: 0, scale: 0.8 });
        setBoobaEmotion('😰');
        break;
    }
  }, [animationStep]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setAnimationStep(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        
        <aside className="w-72 border-r border-border bg-sidebar p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Film" size={28} className="text-primary" />
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Буба Студия
            </h1>
          </div>

          <Tabs defaultValue="characters" className="flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="characters">Персонажи</TabsTrigger>
              <TabsTrigger value="scene">Сцена</TabsTrigger>
            </TabsList>

            <TabsContent value="characters" className="space-y-3 mt-4">
              {characters.map((char) => (
                <Card
                  key={char.id}
                  className={`p-4 cursor-pointer transition-all hover:border-primary ${
                    selectedCharacter === char.id ? 'border-primary bg-accent/20' : ''
                  }`}
                  onClick={() => setSelectedCharacter(char.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{char.emoji}</span>
                    <div>
                      <h3 className="font-semibold">{char.name}</h3>
                      <p className="text-xs text-muted-foreground">3D модель</p>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Мимика</label>
                  <Select defaultValue="neutral">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neutral">😐 Нейтральная</SelectItem>
                      <SelectItem value="happy">😊 Радость</SelectItem>
                      <SelectItem value="surprised">😮 Удивление</SelectItem>
                      <SelectItem value="angry">😠 Злость</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Поза</label>
                  <Select defaultValue="sitting">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sitting">Сидит</SelectItem>
                      <SelectItem value="standing">Стоит</SelectItem>
                      <SelectItem value="walking">Идёт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scene" className="space-y-3 mt-4">
              {sceneObjects.map((obj) => (
                <Card key={obj.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{obj.emoji}</span>
                    <div>
                      <h3 className="font-semibold">{obj.name}</h3>
                      <p className="text-xs text-muted-foreground">Объект сцены</p>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted-foreground">Освещение</label>
                    <span className="text-xs text-primary">{lightIntensity[0]}%</span>
                  </div>
                  <Slider
                    value={lightIntensity}
                    onValueChange={setLightIntensity}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <Icon name="Sun" size={14} />
                    <span>Тёплый свет</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted-foreground">Угол камеры</label>
                    <span className="text-xs text-primary">{cameraAngle[0]}°</span>
                  </div>
                  <Slider
                    value={cameraAngle}
                    onValueChange={setCameraAngle}
                    max={360}
                    step={1}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
            <div className="absolute top-4 left-4 flex gap-2">
              <Button size="sm" variant="secondary">
                <Icon name="Grid3x3" size={16} className="mr-2" />
                Сетка
              </Button>
              <Button size="sm" variant="secondary">
                <Icon name="Ruler" size={16} className="mr-2" />
                Измерения
              </Button>
            </div>

            <Card className="w-[800px] h-[500px] bg-gradient-to-b from-card to-card/80 border-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20" />
              
              <div className="absolute top-4 left-4 bg-muted/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                <p className="text-xs text-muted-foreground">🏠 Советская кухня</p>
              </div>

              <div className="absolute top-4 right-4 bg-muted/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                <p className="text-xs text-muted-foreground">💡 Тёплый свет {lightIntensity[0]}%</p>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-12 relative">
                    <div 
                      className="relative transition-all duration-700"
                      style={{ 
                        transform: `translate(${boobaPos.x}px, ${boobaPos.y}px) scale(${boobaPos.scale})`,
                      }}
                    >
                      <div className="text-9xl">{boobaEmotion === '😊' ? '🐭' : boobaEmotion === '😮' ? '😮' : '😰'}</div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded whitespace-nowrap">
                        Буба
                      </div>
                    </div>
                    
                    <div className="text-7xl absolute left-1/2 -translate-x-1/2">
                      🍲
                    </div>
                    
                    <div 
                      className="relative transition-all duration-700"
                      style={{ 
                        transform: `translateX(${grandmaPos.x}px) scale(${grandmaPos.scale})`,
                        opacity: grandmaPos.scale
                      }}
                    >
                      <div className="text-9xl">{grandmaEmotion}</div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded whitespace-nowrap">
                        Бабушка
                      </div>
                    </div>
                  </div>

                  {showDialog && (
                    <div className="absolute top-20 right-32 bg-destructive/90 text-destructive-foreground px-6 py-4 rounded-2xl rounded-tr-none animate-fade-in shadow-2xl">
                      <p className="text-lg font-bold">
                        "Эй! Вали отсюда чёрт!"
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center gap-3 mt-12">
                    <div className="text-3xl">🪑</div>
                    <div className="text-3xl">📺</div>
                    <div className="text-3xl">🧱</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button size="sm" variant="outline" className="backdrop-blur-sm">
                  <Icon name="ZoomIn" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="backdrop-blur-sm">
                  <Icon name="ZoomOut" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="backdrop-blur-sm">
                  <Icon name="Maximize" size={16} />
                </Button>
              </div>
            </Card>
          </div>

          <div className="h-64 border-t border-border bg-sidebar/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Таймлайн анимации
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isPlaying ? 'default' : 'outline'}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} className="mr-2" />
                  {isPlaying ? 'Пауза' : 'Плей'}
                </Button>
                <Button size="sm" variant="outline" onClick={resetAnimation}>
                  <Icon name="RotateCcw" size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-40">
              {keyframes.map((kf, idx) => (
                <Card
                  key={idx}
                  className={`p-3 cursor-pointer transition-all hover:border-primary ${
                    currentFrame === kf.frame ? 'border-primary bg-accent/20' : ''
                  }`}
                  onClick={() => setCurrentFrame(kf.frame)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">{kf.action}</p>
                        <p className="text-xs text-muted-foreground">Кадр {kf.frame}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{kf.duration}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="w-80 border-l border-border bg-sidebar p-4">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Настройки рендера
          </h2>

          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="Lightbulb" size={16} className="text-primary" />
                Освещение сцены
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Основной свет</span>
                  <span className="text-xs text-primary">80%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Тени</span>
                  <span className="text-xs text-primary">Вкл</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Блики</span>
                  <span className="text-xs text-primary">Средние</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="Video" size={16} className="text-primary" />
                Параметры видео
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Разрешение</label>
                  <Select defaultValue="1080p">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">1280x720 (HD)</SelectItem>
                      <SelectItem value="1080p">1920x1080 (Full HD)</SelectItem>
                      <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">FPS</label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 fps</SelectItem>
                      <SelectItem value="30">30 fps</SelectItem>
                      <SelectItem value="60">60 fps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-accent/10 border-primary">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Icon name="Zap" size={16} className="text-primary" />
                Готово к рендеру
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Все параметры настроены. Начните рендер 3D-анимации.
              </p>
              <Button className="w-full" size="lg">
                <Icon name="Play" size={16} className="mr-2" />
                Запустить рендер
              </Button>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={16} className="text-muted-foreground" />
                Сцена
              </h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Персонажи:</span>
                  <span className="text-foreground">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Объекты:</span>
                  <span className="text-foreground">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Длительность:</span>
                  <span className="text-foreground">0:10</span>
                </div>
                <div className="flex justify-between">
                  <span>Ключевые кадры:</span>
                  <span className="text-foreground">4</span>
                </div>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;