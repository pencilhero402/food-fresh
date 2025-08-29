import pygame
import random
import time

# Initialize colors
BLACK = (0,0,0)
WHITE = (255,255,255)
BG_COLOR = (17,208,144)
LAYER_COLOR = (214,247,205)
GRID_COLOR = (232,253,231)
HIGHLIGHT = (254,225,86)

class Layers:
    def __init__(self, screen, layer, game):
        self.screen = screen
        self.layer = layer
        self.game = game

class Fruit(pygame.sprite.Sprite):
    def __init__(self, val, id, coords, width=35, height=30):
        pygame.sprite.Sprite.__init__(self)

        Fruits = {
            1 : "1.png",
            2 : "2.png",
            3 : "3.png",
            4 : "4.png",
            5 : "5.png",
            6 : "6.png",
            7 : "7.png",
            8 : "8.png",
            9 : "9.png"
        }
        # Value of each fruit corresponds to different image path
        # Store an id value to differentiate each fruit
        self.value = val
        self.id = id

        # Image of the fruit
        img = pygame.image.load(Fruits[self.value])

        # Adjust the scale of each image
        self.image = pygame.transform.scale(img, (width, height))
        self.rect = self.image.get_rect()
        self.rect.center = (coords[0]-50, coords[1]-50)

        # Coords of fruit
        self.x = coords[0]
        self.y = coords[1]
    
    def getRectFromId(self, id):
        return self.rect


class SceneBase:
    # Constructor
    def __init__(self):
        self.next = self

    def SwitchToScene(self, next_scene):
        self.next = next_scene

    def ProcessInput(self, events, pressed_keys):
        print("Override from child class failed")

    def Update(self):
        print("Override from child class failed")

    def Render(self, layers):
        print("Override from child class failed")

    def TerminateScene(self):
        self.SwitchToScene(None)


class TitleScene(SceneBase):
    def __init__(self):
        SceneBase.__init__(self)    # TitleScene calls Constructor of parent class SceneBase
        self.play_btn = ((0,0), (0,0))

    def ProcessInput(self, events, pressed_keys):
        for event in events:
            mouse = pygame.mouse.get_pos()
            mouse = (mouse[0]-50,mouse[1]-50)
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                self.SwitchToScene(GameScene())
            elif event.type == pygame.MOUSEBUTTONDOWN:
                print(mouse)
                if self.play_btn[1].collidepoint(mouse):
                    print("Play!")
                    #self.SwitchToScene(GameScene())

    def Update(self):
        pass
    
    def Buttonify(self, image_path, coords, surface, scale=None):
        image = pygame.image.load(image_path).convert_alpha()

        if scale is not None:
            image = pygame.transform.scale(image, scale)

        image_rect = image.get_rect()

        # Offset by 50 for the padding
        # Probably a much better way to implement this
        image_rect.topleft = (coords[0], coords[1])
        #print(f"Image: {image}, Image_Rect: {image_rect}")
        surface.blit(image, image_rect)
        return image, image_rect

    def Render(self, layers):
        layers.screen.fill(BG_COLOR)
        layers.layer.fill(LAYER_COLOR)
        layers.game.fill(WHITE)

        self.Buttonify("FruitBox.png", (0,0), layers.game, (250, 100))
        self.play_btn = self.Buttonify("Play.png", (100, 150), layers.game, (100, 100))
        layers.layer.blit(layers.game, (25,25))
        layers.screen.blit(layers.layer, (25,25))


class GameScene(SceneBase):
    def __init__(self):
        SceneBase.__init__(self)
        self.dragging = False
        self.start_pos = (0,0)
        self.current_pos= (0,0)
        self.highlighted= None 
        self.layers = None
        self.grid_drawn = False
        self.grid_surface = None
        self.fruits_drawn = False
        self.scored = False
    
        self.fruits = pygame.sprite.Group()
        self.highlight = {}


    def ProcessInput(self, events, pressed_keys):
        for event in events:
            print(self.highlight)
            mouse = pygame.mouse.get_pos()
            #print(mouse)
            self.current_pos = mouse
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                self.SwitchToScene(TitleScene())
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:
                    self.dragging = True
                    self.start_pos = mouse 
            elif event.type == pygame.MOUSEBUTTONUP:
                if event.button == 1:
                    self.dragging = False
                    if sum(self.highlight.values()) == 10:
                        print("Sum is 10")
                        for fruit in list(self.fruits):
                            if fruit.id not in self.highlight:
                                continue
                            self.fruits.remove(fruit)
                            print(f"Removed fruits: {fruit.id}")
                            self.scored = True
                self.highlight = {}
            elif event.type == pygame.MOUSEMOTION:
                if self.dragging:
                    self.current_pos = mouse


    def Update(self):
        pass

    def Grid(self, res):
        if self.grid_drawn:
            return 

        self.grid_surface = pygame.Surface(res)
        self.grid_surface.fill(WHITE)
        id = 0

        block_size = 5
        for i in range(0, res[0], block_size):
            for j in range(0, res[1], block_size):
                rect = pygame.Rect(i, j, block_size, block_size)
                pygame.draw.rect(self.grid_surface, GRID_COLOR, rect, 1)

    def drawFruits(self, screen, res):
        rows = 11
        cols = 11
        id = 0
        for i in range(30, res[0]-50, (res[0]-50) // rows):
            for j in range(30, res[1]-50, (res[1]-50) // cols):
                val = random.randrange(1, 9)
                fruit = Fruit(val, id,  (i, j))
                #print(f"Coords: ({fruit.x}, {fruit.y})")
                self.fruits.add(fruit)
                self.fruits.draw(screen) 
                id += 1

        self.grid_drawn = Trute

    def Render(self, layers):
        if self.layers is None:
            self.layers = layers

        self.layers.screen.fill(BG_COLOR)
        self.layers.layer.fill(LAYER_COLOR)
        self.layers.game.fill(WHITE)

        if not self.grid_drawn:
            self.Grid((720, 470))
            self.grid_drawn = True

        if not self.fruits_drawn:
            self.drawFruits(self.grid_surface, (720, 470))
            self.fruits_drawn = True

        if self.scored:
            # Clear the grid surface by redrawing the grid background
            self.grid_surface.fill(WHITE)

            # Draw remaining fruits
            self.fruits.draw(self.grid_surface)
            self.scored = False        

        self.layers.game.blit(self.grid_surface, (0, 0))
        self.layers.layer.blit(layers.game, (25,25))
        self.layers.screen.blit(layers.layer, (25,25))

        # Draws the highlight rect
        if self.dragging:
            x1,y1 = self.start_pos
            x2,y2 = self.current_pos
            self.highlighted = pygame.Rect((min(x1,x2), min(y1,y2)),(abs(x2-x1), abs(y2-y1)))
            pygame.draw.rect(self.layers.screen, HIGHLIGHT, self.highlighted, 2)
            self.checkHighlightedFruits()

    def checkHighlightedFruits(self):
        x1,y1 = self.start_pos
        x2,y2 = self.current_pos
        for fruit in self.fruits:
            if min(x1,x2) <= fruit.x <= max(x1,x2) and min(y1,y2) <= fruit.y <= max(y1,y2):
                self.highlight[fruit.id] = fruit.value
            elif fruit.id in self.highlight: 
                del self.highlight[fruit.id]

def run_game(start_scene, fps=60):
    pygame.init()
    res = (720, 470)
    padding = 50
    layer_res = (res[0]-padding,res[1]-padding)
    game_res = (layer_res[0]-padding,layer_res[1]-padding)

    screen = pygame.display.set_mode(res)
    layer = pygame.Surface(layer_res)
    game = pygame.Surface(game_res)

    layers = Layers(screen, layer, game)

    clock = pygame.time.Clock()

    running = True
    active_scene = start_scene
    while active_scene != None:
        pressed_keys = pygame.key.get_pressed()

        # Event filtering
        filtered_events = []
        for event in pygame.event.get():
            quit_attempt = False
            if event.type == pygame.QUIT:
                quit_attempt = True

            elif event.type == pygame.KEYDOWN:
                alt_pressed =   pressed_keys[pygame.K_LALT] or \
                                pressed_keys[pygame.K_RALT]
                if event.key == pygame.K_ESCAPE:
                    quit_attempt = True
                elif event.key == alt_pressed and event.key == pygame.K_F4:
                    quit_attempt = True

            if quit_attempt:
                active_scene.Terminate()
            else:
                filtered_events.append(event)

        active_scene.ProcessInput(filtered_events, pressed_keys)
        active_scene.Update()
        active_scene.Render(layers)

        active_scene = active_scene.next
        pygame.display.flip()
        clock.tick(fps)

if __name__ == "__main__":
    run_game(TitleScene())
