import pygame
import typing
import random

# Initialize pygame
pygame.init()

# Initialize colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
HIGHLIGHT = (254, 225, 86)
HIGHLIGHT_OUTLINE = (36, 169, 212)

# Set the game window
screen = pygame.display.set_mode(size=(720, 470))
screen.fill( (WHITE) )


def main():
    running = True
    dragging = False
    start_pos = (0, 0)
    current_pos = (0, 0)
    while running:
        for event in pygame.event.get():
            mouse = pygame.mouse.get_pos()
            current_pos = mouse
            if event.type == pygame.QUIT:
                running = False

            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:
                    start_pos = mouse
                    dragging = True

            elif event.type == pygame.MOUSEBUTTONUP:
                if event.button == 1:
                    dragging = False

            elif event.type == pygame.MOUSEMOTION:
                if dragging:
                    current_pos = mouse
            
        screen.fill(WHITE)

        if dragging:
            x1, y1 = start_pos
            x2, y2 = current_pos
            area = pygame.Rect( (min(x1, x2), min(y1, y2)), (abs(x2-x1), abs(y2-y1)))
            pygame.draw.rect(screen, HIGHLIGHT, area, 2)
            print(f"Start: {start_pos}, End: {current_pos}")
                
        pygame.display.flip()
    pygame.quit()

if __name__ == '__main__':
    main()
