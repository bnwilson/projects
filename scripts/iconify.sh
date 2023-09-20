#!/bin/bash

### Converts a given image file to an icon (.ico) file
###  example:
###  	"./iconify.sh image_name.png"
###  creates an "icons/oldIcons/" file and copies original to that location
###
### Requirements:
###		imagemagick
###
### Download & installation info can be found below:
### 	- https://imagemagick.org/script/download.php
### 	- win10, linux, & macOS

# Image-file name as first arg
IMAGE=$1

# Constant variables
ICONFILE="icons"
OLDICONS="$ICONFILE/old_icons"

# Exit 16 - filename not given (no arg passed)
if [ -z "$IMAGE" ];then
	echo "Must pass a file name in the current directory or FQN\n   ex. './iconify.sh original_image.png'"
	exit 16
fi

# Exit 17 - if arg file does not exist
if [ ! -f "$IMAGE" ]; then 
	echo "This file doesn't exist"
	exit 17
fi

# Exit 18 - not a valid image file extension
if [[ "$IMAGE" =~ \.(bmp|jpg|tif|tiff|png|gif|jpeg)$ ]]; then
	echo "File does have a valid extension, continuing ..."
	echo "  ..."
else
	echo "Error 18:  the file '$IMAGE' does NOT have a valid image-file-extension (.bmp, .jpg, etc.)"
	exit 18
fi

if [ ! -e "$ICONFILE" ]; then
	mkdir "$ICONFILE"
	if [ ! -e "$ICONFILE/icon_old" ]; then
		mkdir $ICONFILE/icon_old
	fi
fi

#Empty and move to old
if [ -s "$ICONFILE" ]; then
	rm -r "$OLDICONS/"
	mv "$ICONFILE/*" "$OLDICONS"
fi

# Create icon file sizes
magick convert "$IMAGE" -resize 16x16 "$ICONFILE/16.png"
magick convert "$IMAGE" -resize 32x32 "$ICONFILE/32.png"
magick convert "$IMAGE" -resize 48x48 "$ICONFILE/48.png"

cd "$ICONFILE"
magick convert 16.png 32.png 48.png "$IMAGE.ico"

echo $(identify "$IMAGE".ico)
