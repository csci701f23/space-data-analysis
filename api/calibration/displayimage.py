# This script plots a fits image    


# Written by Catherine Miller
# 10-24-2023

# code snippets from the Astropy CCD Data Reduction Guide were copied and adapted:
# https://www.astropy.org/ccd-reduction-and-photometry-guide/v/dev/notebooks/00-00-Preface.html

# code snippets from the Astropy documentation pages were copied and adapted:
# https://docs.astropy.org/en/stable/index.html


############################## LOAD PACKAGES ###############################

# load data handling and plotting packages
import numpy as np
import matplotlib.pyplot as plt

# load astropy packages
from astropy.nddata import CCDData
from astropy import visualization as aviz


################################# OPEN FILE ################################
# open file
ccd = CCDData.read('Autosave Image -0007NGC6888B.fit', unit='adu')    
data = ccd.data


################################# PLOT DATA ################################
# create figure    
fig, ax = plt.subplots(1, 1)
    
# scaling parameters taken from Astropy CCD Data Reduction Guide's "show_image" function, which can be found in the "convenience_functions.py" file
percu = 99
percl = 1
clip=True
stretch = aviz.LinearStretch()
norm = aviz.ImageNormalize(data, 
                        interval=aviz.AsymmetricPercentileInterval(percl, percu),
                        stretch=stretch, clip=clip)
scale_args = dict(norm=norm)
    
# plot data    
im = ax.imshow(data, origin='lower', cmap='gray', aspect='equal', **scale_args)

# turn on colorbar
fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04)

# show plot
plt.show()