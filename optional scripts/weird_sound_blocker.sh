#!/bin/bash

# solves ubuntu 20.04 weird sound issuer while connecting earphones
echo 0 | sudo tee /sys/module/snd_hda_intel/parameters/power_save_controller
echo 0 | sudo tee /sys/module/snd_hda_intel/parameters/power_save
