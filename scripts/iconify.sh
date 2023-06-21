#!/bin/bash

### Converts a given image file to an icon (.ico) file
###  example:
###  	"./iconify.sh image_name.png"
###  creates an "icons/oldIcons/" file and copies original to that location

# Image name as first arg
IMAGE=$1
ICONFILE="icons"
OLDICONS="$ICONFILE/old_icons"

# Check if arg was made
if [ -z "$IMAGE" ];then
	echo "Must pass a file name in the current directory or FQN"
	exit 16
fi

# Check if file existscurrent directory
if [ ! -f "$IMAGE" ]; then 
	echo "This file doesn't exist"
	exit 16
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
