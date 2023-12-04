### Introduction 

Mittelman Observatory at Middlebury College is the “largest and best equipped”[^Middlebury] institution observatory in the state of Vermont. The aim of this project is to make the Middlebury telescope more accessible to Middlebury students. Many students do not know how to utilize the resources that the telescope provides, and there is currently no streamlined way to process telescope images. Students are taught to use DS9, a much older software, with few resources for students to learn the platform. While newly developed AstroPy scripts for calibration do exist within the observatory, being able to run these requires a compiler and knowledge of how to run python scripts. Students will be able to utilize our webapp to take advantage of AstroPy and will be walked through the steps to calibrating their images during the process. 

Science image calibration requires three additional types of raw data files: bias images, dark images, and flat images. These images are used to reduce noise, and find the contamination on the telescope in order to increase the accuracy of the science image. The image calibration process begins with the combination of raw files into combined files. The combined files are used to calibrate the science images, before they are aligned and combined. The combined science images are still grayscale images. To create a color image, the three combined science images (one red, one blue, one green) must be combined into a single RGB image.

AstroPy is an open-sourced python package for astronomers that was developed starting in 2011. The package includes tools to simplify processes necessary for image calibration including input and output functionality for FITS files, world coordinate systems in images, cosmological calculations, manipulation of numerical quantities, and the ability for interactive analysis of telescope data[^Robitaille2013]. Currently, the observatory has develped scripts that use AstroPy for the calibration process and our webapp will provide students with the ability to utilize these scripts. In a similar case, an iPython widget was developed for a telescope at the Minnesota State University Moorhead. The goal was to create an easy application for students to calibrate their images with. While the widget format differs from our web app, this case shows the effectiveness of creating a webapp allowing students without programming background to interface with existing python scripts without needing to download and compile them on their machines[^Craig2015]. Our pipeline takes care of passing the image files to the scripts and eliminates the chance of students encountering programming bugs.  

### Methodology

### References

[^Craig2015]: Craig, M. *Widgets and Astropy: Accomplishing Productive Research with Undergraduates* PROC. OF THE 14th PYTHON IN SCIENCE CONF. (SCIPY 2015) https://conference.scipy.org/proceedings/scipy2015/pdfs/matthew_craig.pdf 

[^Middlebury]: Middlebury College, *Mittelman Observatory* https://sites.middlebury.edu/observatory/

[^Robitaille2013]: Robitaille, T. et. al. *Astropy: A community Python Package for Astronomy* A&A, 558 (2013) A33 DOI: https://doi.org/10.1051/0004-6361/201322068

