import pygame as py
import random
import typing

py.init()
time = py.time.Clock()

res = (720, 470)
play_res = (620, 370)
SCREEN = py.display.set_mode(res)
LAYER_SCREEN = py.Surface((670, 420))
PLAY_SCREEN = py.Surface(play_res)

# Initialize colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
SCREEN_BG_COLOR = (17, 208, 144)
GAME_BG_COLOR = (214, 247, 205)
GRID_LINES = (232, 253, 231)

"""
Maybe should implement Images that stores each image
"""

# Create a Fruit Class
class Fruit(py.sprite.Sprite):
    def __init__(self, val, pos, scale=None):
        py.sprite.Sprite.__init__(self)
        self.value = val
        self.pos = pos
        self.scale = scale
        self.images = {
            1: "1.png",
            2: "2.png",
            3: "3.png",
            4: "4.png",
            5: "5.png",
            6: "6.png",
            7: "7.png",
            8: "8.png",
            9: "9.png",
        }


def Buttonify(image_path, coords, surface, scale=None):
    image = py.image.load(image_path).convert_alpha()

    if scale is not None:
        image = py.transform.scale(image, scale)
        
    image_rect = image.get_rect()
    image_rect.topleft = coords
    surface.blit(image, image_rect)

    # Offset by 50 for the padding
    # Probably a much better way to implement this
    image_rect.topleft = (coords[0]+50, coords[1]+50)
    return image, image_rect


""" First Scene:
Initializes background of scenes: 
SCREEN -> LAYER_SCREEN -> PLAY_SCREEN
Displays images on PLAY_SCREEN
Returns: rect of scaled_play_btn
Used for py.Rect.collidepoint()
"""
# Set backgrounds
SCREEN.fill(SCREEN_BG_COLOR)
LAYER_SCREEN.fill(GAME_BG_COLOR)
PLAY_SCREEN.fill(WHITE)

def Play_Screen() -> None:
    # Layer images onto PLAY_SCREEN
    logo = py.image.load("FruitBox.png")
    scaled_logo = py.transform.scale_by(logo, 0.5)

    Buttonify("FruitBox.png", (0, 0), PLAY_SCREEN, (250, 100))
    play_btn = Buttonify("play.png", (100, 150), PLAY_SCREEN, (100, 100))

    LAYER_SCREEN.blit(PLAY_SCREEN, (25, 25))
    SCREEN.blit(LAYER_SCREEN, (25, 25))

    return play_btn

"""
Game screen 
"""
def Game_Screen() -> None:
    SCREEN.fill(SCREEN_BG_COLOR)
    LAYER_SCREEN.fill(GAME_BG_COLOR)
    PLAY_SCREEN.fill(WHITE)
    Grid()

    LAYER_SCREEN.blit(PLAY_SCREEN, (25, 25))
    SCREEN.blit(LAYER_SCREEN, (25, 25))

def Grid():
    block_size = 5
    for i in range(0, play_res[0], block_size):
        for j in range(0, play_res[1], block_size):
            rect = py.Rect = (i, j, block_size, block_size)
            py.draw.rect(PLAY_SCREEN, GRID_LINES, rect, 1)

def main() -> None:
    running = True
    play_btn = Play_Screen()
    print(play_btn)
    scene = 0   # Initial Play Screen
    while running:
        for event in py.event.get():
            if event.type == py.QUIT:
                running = False

            # PLAY SCREEN
            if scene == 0:
                if event.type == py.MOUSEBUTTONDOWN:
                    mouse = py.mouse.get_pos()
                    if play_btn[1].collidepoint(mouse):
                        print("PLAY!")
                        print(mouse)
                        scene += 1
                        Game_Screen()


            # GAME SCREEN
            # if scene == 1:


        py.display.flip()
        # Keep track of mouse posiition -> (x, y)
        mouse = py.mouse.get_pos()
        #print(mouse)
    py.quit()


if __name__ == '__main__': 
    main()
