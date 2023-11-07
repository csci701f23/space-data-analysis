### Written by Catherine Miller

# load astropy packages
from astropy.nddata import CCDData

# open file
ccb = CCDData.read('Autosave Image -0007NGC6888B.fit', unit = 'adu')

print('Image Type:', ccd.meta['imagetyp'])
print('Filter:', ccd.meta['filter'])
print('CCD Temperature:', ccd.meta['ccd-temp'], 'degrees Celcius')
print('Exposure Time:', ccd.meta['exptime'], 's')

