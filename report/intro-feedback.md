### Introduction 

Mittleman Observatory at Middlebury College is the “largest and best equipped”[^Middlebury] institution observatory in the state of Vermont. The aim of this project is to make the Middlebury telescope more accessible to Middlebury students. Many students do not know how to utilize the resources that the telescope provides, and there is currently no streamlined way to process telescope images. 

Science image calibration requires three additional types of raw data files: bias images, dark images, and flat images. These images are used to reduce noise, and find the contamination on the telescope in order to increase the accuracy of the science image. Generally, bias and dark frames can be stable for several months, so long as the temperature and exposure times match the science image, but flat images need to be taken of the twilight sky the same night as the science image. The image calibration process begins with the combination of raw files into combined files through a series of combination and subtraction steps. The combined files are used to calibrate the science images, before they are aligned and combined. The combined science images are still grayscale images. To create a color image, the three combined science images must be combined into a single RGB image.

AstroPy is an open-sourced python package for astronomers that was developed starting in 2011. The package includes tools to simplify processes necessary for image calibration including input and output functionality for FITS files, world coordinate systems in images, cosmological calculations, manipulation of numerical quantities, and the ability for interactive analysis of telescope data[^Robitaille2013]. The Python package has been used in a number of practical applications. The Zwicky Transient Facility (ZTF) is a three year survey based out of southern California, which would take up to 750 exposures, or 1 TB of data per night. The project used an image subtraction pipeline to gain insights into the images captured. Their pipelines demonstrated the power of AstroPy and its application in Astronomy research[^Shupe2018]. Another application was an iPython widget developed for a telescope at the Minnesota State University Moorhead. This was a very similar case to ours, where the goal was to create an easy application for students to calibrate their images with. While the widget format differs from our web app, this case shows the effectiveness of astropy in a similar educational setting[^Craig2015]. 

By leveraging AstroPy packages, we can simplify the image calibration process for the Mittleman Observatory. 


### References

[^Craig2015]: Craig, M. *Widgets and Astropy: Accomplishing Productive Research with Undergraduates* PROC. OF THE 14th PYTHON IN SCIENCE CONF. (SCIPY 2015) https://conference.scipy.org/proceedings/scipy2015/pdfs/matthew_craig.pdf 

[^Middlebury]: Middlebury College, *Mittleman Observatory* https://sites.middlebury.edu/observatory/

[^Robitaille2013]: Robitaille, T. et. al. *Astropy: A community Python Package for Astronomy* A&A, 558 (2013) A33 DOI: https://doi.org/10.1051/0004-6361/201322068

[^Shupe2018]: Shupe, D., F. Masci, R. Laher, B. Rusholme, L. Armus. *Practical Applications of Astropy*. PROC. OF THE 17th PYTHON IN SCIENCE CONF. (SCIPY 2018) https://www.youtube.com/watch?v=2GTLkH5sfJc
