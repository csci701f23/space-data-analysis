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
    ccd = CCDData.read(image_path, unit='adu')
    print('Image Type:', ccd.meta['imagetyp'])
    #print('Filter:', ccd.meta['filter'])
    print('CCD Temperature:', ccd.meta['ccd-temp'], 'degrees Celsius')
    print('Exposure Time:', ccd.meta['exptime'], 's')
    return "Image read"
