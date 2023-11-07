''' 
The astronomyRGB.py module provides two functions: calibrate_images and combineRGB. 
When used together, these functions can calibrate three raw science images for one space object 
and combine them into a single, full-color image, which is saved as a jpeg file.

The following are the external inputs required to use these functions:

    raw_directory:  String containing the path to the directory where
                    the raw science images are stored. This directory should
                    contain data for ONE object (e.g. galaxy, nebula, etc.)
                    and should have:
                                    ONE raw science image in the Red filter,
                                    ONE raw science image in the Green filter, 
                                and ONE raw science image in the Blue filter.
    
    calibration_directory: String containing the path to the directory where
                           the combined calibration images are stored. This 
                           directory should contain the following files:
                                    ONE combined bias
                                    ONE combined dark
                                    ONE combined flat in the Red filter
                                    ONE combined flat in the Green filter
                                    ONE combined flat in the Blue filter
    
    scaling_parameters: This is a dictionary of the scaling parameters required for RGB combination.
                        The keys to the dictionary are strings containing the names of the parameters.
    
    output_filepath: This is a string that contains the path, 
                     including filename and extension, for the output file. 
                     This is where the combined RGB image will be saved.
            
 
The first step is to call calibrate_images and provide the raw_directory and calibration_directory. 
This function returns a dictionary of the calibrated science data.

The second step is to call combineRGB and provide the dictionary of calibrated science data from the 
previous step, as well as the scaling_parameters and the output_filepath. 
 
 
 
Note: The following is advice on setting the scaling parameters for RGB image combination:
        
        The "minimum" parameter is set to zero by default. 
        The minimum should be set somewhere between 0 and 100. 
        This parameter needs to be large enough to ensure that the sky background looks black, 
        but not so large that the object disappears.

        The "Q" parameter is a 'softening' parameter that is set to 8 by default. 
        This parameter should be set somewhere between 0 and 100. 
        It is used to help bring out structure in the image.

        The "stretch" parameter sets the linear stretch of the image and is set to 5 by default.
        Linear stretch is related to the dynamic range of the image.
        Smaller values typically make the object brighter, whereas larger values make the object dimmer. 
        This parameter should be set somewhere between 1 and 100. 
        (DO NOT SET STRETCH TO ZERO - it throws an error)

 
 
Note: Each raw science image is calibrated using the following steps:
   1: subtract combined bias
   2: subtract combined dark
   3: divide by combined flat in matching filter (for example, a raw science image taken with the Red filter needs to be divided by the combined flat taken in the Red filter).

Note: In this script, the raw science image is cropped before the flat correction is applied. 
This is because the combined flats are cropped images. In order to apply the flat correction, 
both the science image and flat image must be the same size. (This will be removed later when
better flat images are acquired.)

Note: Bias and dark frames must have the same CCD temperature as the science images. 
In this script, we assume all images are taken at -25.0C.
      
      
      
Written by Catherine Miller
10-25-2023

code snippets from the Astropy CCD Data Reduction Guide were copied and adapted:
https://www.astropy.org/ccd-reduction-and-photometry-guide/v/dev/notebooks/00-00-Preface.html

code snippets from the Astropy documentation pages were copied and adapted:
https://docs.astropy.org/en/stable/index.html
https://docs.astropy.org/en/stable/visualization/rgb.html      
                                  
'''

###################################### LOAD PACKAGES ####################################

# load file read/write packages
from pathlib import Path

# load math/plotting packages
import numpy as np

# load astropy packages
from astropy.nddata import CCDData
from astropy import units as u
import ccdproc as ccdp
from astropy.visualization import make_lupton_rgb


################################# BEGIN DEFINE FUNCTIONS ################################
    
def calibrate_images(raw_directory, calibration_directory):
    '''
    This function takes three raw science images (one in Red filter, one in Green filter, 
    and one in Blue filter) for one space object and calibrates them.
    
    Note: The calibrated data is NOT written to output .fit files. Instead the calibrated data for all
    three science images are stored as numpy arrays within a dictionary, which is returned by this function.
    
    Inputs:
            raw_directory:  String containing the path to the directory where
                            the raw science images are stored. This directory should
                            contain data for ONE object (e.g. galaxy, nebula, etc.)
                            and should have:
                                         ONE raw science image in the Red filter,
                                         ONE raw science image in the Green filter, 
                                     and ONE raw science image in the Blue filter.
    
            calibration_directory: String containing the path to the directory where
                                   the combined calibration images are stored. This 
                                   directory should contain the following files:
                                        ONE combined bias
                                        ONE combined dark
                                        ONE combined flat in the Red filter
                                        ONE combined flat in the Green filter
                                        ONE combined flat in the Blue filter
    
    Outputs:
            calibrated_images:  This is a dictionary that stores the calibrated science image data.
                                The keys to the dictionary are strings containing the names of the filters.
    
    '''
    

    #################################### OPEN FILES #################################### 
    
    # create image file collection of raw data files
    ifc_raw = ccdp.ImageFileCollection(raw_directory)
    
    # create image file collection of calibration data files
    ifc_calibration = ccdp.ImageFileCollection(calibration_directory)
    
    # find combined bias file
    file_list = ifc_calibration.files_filtered(imagetyp='bias', include_path=True)
    # open combined bias file (there is only one file in this example, so take the
    # first and only filename from the list)
    combined_bias = CCDData.read(file_list[0], unit='adu')
    
    # find combined dark file
    file_list = ifc_calibration.files_filtered(imagetyp='dark', include_path=True)
    # open combined dark file (there is only one file in this example, so take the
    # first and only filename from the list)
    combined_dark = CCDData.read(file_list[0], unit='adu')
    
    
    ############################# CALIBRATE SCIENCE IMAGES #############################
    filters = ['Red', 'Green', 'Blue']
    
    # create empty dictionary to store numpy arrays of image data
    # the dictionary keys are strings containing the filter color names
    calibrated_images = dict()

    # iterate over filters
    for filt in filters:
    
        ########################### OPEN COMBINED FLAT FILE ############################
            
        # find combined flat file with the correct filter
        file_list = ifc_calibration.files_filtered(imagetyp='flat', filter=filt, include_path = True)
        
        if len(file_list) == 0:
            print('Error: No combined flat files found for', filt, 'filter.')

        # open the combined flat image (there should only be one combined file for each filter, so take the first and only filename from the list)
        combined_flat = CCDData.read(file_list[0], unit='adu')

        ############################# OPEN RAW SCIENCE FILES ###########################
            
        # find raw science image files with the correct filter (note: 'light' image type means it's a science image)
        raw_files = ifc_raw.files_filtered(imagetyp='light', filter=filt, include_path = True)
        if len(raw_files) == 0:
            print('Error: No raw science image files found for', filt, 'filter.')
            
        # there should only be one raw science image file with the current filter, get that filepath from the list
        filepath = raw_files[0]

        # open raw science image    
        ccd = CCDData.read(filepath, unit='adu')
            
        # subtract bias from raw science image
        ccd = ccdp.subtract_bias(ccd, combined_bias)
            
        # subtract dark from science image 
        ccd = ccdp.subtract_dark(ccd, combined_dark, exposure_time='exptime', exposure_unit=u.second, scale=True)
            
        # crop science image to the same size as the combined flats, which are cropped.
        x0 = 100
        y0 = 100
        ccd = ccdp.trim_image(ccd[y0:(y0 + 3896), x0:(x0 + 3896)])
        
        # Now that science image is the same size as combined flat image, 
        # apply flat correction (this is dividing by the combined flat)
        ccd = ccdp.flat_correct(ccd, combined_flat)

        # the science image is now calibrated, store the data in the calibrated_images dictionary
        calibrated_images[filt] = ccd.data
        
    # all three raw science images have now been calibrated, return the dictionary of data
    return calibrated_images



def combineRGB(calibrated_images, scaling_parameters, output_filepath):
    '''
    This function takes three calibrated science images (one in Red filter, one in Green filter, 
    and one in Blue filter) for one space object and creates a single, full-color RGB image, saved as a jpeg file.
    
    Inputs:
            calibrated_images:  This is a dictionary that stores the calibrated science image data.
                                The keys to the dictionary are strings containing the names of the filters.
    
            scaling_parameters: This is a dictionary of the scaling parameters required for RGB combination.
                                The keys to the dictionary are strings containing the names of the parameters.
                                See top of script for a detailed description of the three parameters.
    
            output_filepath:    This is a string that contains the path, including filename and extension, 
                                for the output file. This is where the combined RGB image will be saved.
     
     
    Outputs:
            returns None
    
            (saves the combined RGB image to a jpeg file.)
    '''
    
    # extract the data for the calibrated science image in the Red filter
    red_img = calibrated_images['Red']
    # extract the data for the calibrated science image in the Green filter
    green_img = calibrated_images['Green']
    # extract the data for the calibrated science image in the Blue filter
    blue_img = calibrated_images['Blue']

    # extract the "minimum" parameter from the dictionary
    minimum = scaling_parameters['minimum']
    # extract the "Q" parameter from the dictionary
    q = scaling_parameters['Q']
    # extract the "stretch" parameter from the dictionary
    stretch = scaling_parameters['stretch']
    
    # call the make_lupton_rgb function with the three parameters to adjust the image scaling:
    image_RGB = make_lupton_rgb(red_img, green_img, blue_img,
                                minimum=minimum, Q=q, stretch=stretch, 
                                filename=output_filepath)


################################# END DEFINE FUNCTIONS ################################# 