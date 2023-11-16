'''
createRGB.py is a script that calibrates three raw science images for one space object and combines them into a single, full-color image, which is saved as a jpeg file.

This script calls functions from the astronomyRGB.py module, which is imported.

The required inputs to the astronomyRGB module functions are:

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
    
    output_filepath: This is a string that contains the path, 
                     including filename and extension, for the output file. 
                     This is where the combined RGB image will be saved.   
         

Written by Catherine Miller
10-25-2023

code snippets from the Astropy CCD Data Reduction Guide were copied and adapted:
https://www.astropy.org/ccd-reduction-and-photometry-guide/v/dev/notebooks/00-00-Preface.html

code snippets from the Astropy documentation pages were copied and adapted:
https://docs.astropy.org/en/stable/index.html
https://docs.astropy.org/en/stable/visualization/rgb.html  
            
'''
 
###################################### LOAD PACKAGES ####################################

from astronomyRGB import calibrate_images
from astronomyRGB import combineRGB


############################ CALL astronomyRGB FUNCTIONS ################################

# set inputs (see descriptions at top of script)

def create_rgb(raw_directory, calibration_directory, output_filepath):

    scaling_parameters = {'minimum':50, 'Q':1, 'stretch':25}

    # call calibrate_images function to calibrate the raw science images
    calibrated_images = calibrate_images(raw_directory, calibration_directory)
        
    # call combineRGB function to combine calibrated science images into one full-color jpeg image
    combineRGB(calibrated_images, scaling_parameters, output_filepath)
    return output_filepath

