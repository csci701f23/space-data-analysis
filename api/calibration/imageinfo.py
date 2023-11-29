# This prints out information about the ccd image.


# Written by Catherine Miller
# 10-24-2023

# code snippets from the Astropy CCD Data Reduction Guide were copied and adapted:
# https://www.astropy.org/ccd-reduction-and-photometry-guide/v/dev/notebooks/00-00-Preface.html

# code snippets from the Astropy documentation pages were copied and adapted:
# https://docs.astropy.org/en/stable/index.html


############################## LOAD PACKAGES ###############################

# load astropy packages
from astropy.nddata import CCDData

    
################################# OPEN FILE ################################

# open file

def read_image(image_path):
    ccd = CCDData.read(image_path, unit='adu', format="fits")
    imageType = ccd.meta['imagetyp']
    print('Filter:', ccd.meta['filter'])
    temp = ccd.meta['ccd-temp'], 'degrees Celsius'
    exposureTime = ccd.meta['exptime']
    return {"imageType" : imageType, "temp": temp, "exposure": exposureTime}

info = read_image("cs701-files/data/calibration-images/combined-flats/combined_flat_Green-cropped.fit")
print(info)
