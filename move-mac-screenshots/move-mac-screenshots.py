#!/usr/bin/Python

import subprocess

def moveScreenshots():
  NOTHING = "No such file or directory"
  checkFiles = subprocess.getstatusoutput("ls ~/Desktop/Screen*")  
  if NOTHING not in checkFiles:
    mvCmd = "mv -i -v ~/Desktop/Screen* ~/Pictures/ScreenShots/"
    mvCmd2 = "mv -i -v ~/Desktop/LWScreen* ~/Pictures/ScreenShots/"
    moveScreenshots = subprocess.getstatusoutput(mvCmd)
    moveScreenshots2 = subprocess.getstatusoutput(mvCmd2)
    
    return moveScreenshots, moveScreenshots2
  
  else:
    print ("No screenshots today")

if __name__ == '__main__':
  moveScreenshots()
