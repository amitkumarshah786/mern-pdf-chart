# mern-pdf-chart
The mern-pdf-chart is developed to provide users with a simple and powerful way to upload PDF files, extract text-based data, and visualize this information through dynamic charts and graphs. The tool is designed to help users make data-driven decisions without requiring specialized software installations.

This tool enables users to upload PDFs, automatically extract specific data, and visualize the information in various formats, including bar and pie charts. It supports filtering by region to allow for focused analysis and offers download options for both the visualized data and the raw data. With features that cater to a wide range of user needs, this tool promotes accessible data analysis, especially for users without technical expertise.

The PDF Data Visualization Tool is a web-based application that leverages online libraries such as PDF.js and Chart.js to achieve several core objectives:
•	Machine Independence: By using online libraries, the application avoids reliance on any specific software installed on the user's device. This design choice allows the tool to operate on any machine with internet access, making it highly portable and accessible across different operating environments.

•	Cross-Device Accessibility: The use of online libraries, combined with a responsive design, ensures that the application adapts seamlessly to desktops, tablets, and mobile devices. This approach broadens the accessibility of the tool, enabling users to work with it in various contexts, such as on the go or from multiple devices.

•	Responsive Interface: Built using CSS media queries and JavaScript, the application adjusts to various screen sizes, ensuring optimal usability and readability on all device types.
By adopting these technologies, the tool is not only versatile in its environment but also lowers the technical barrier for users who may lack access to specific software.

Library Used:
1. pdf.js
 	Purpose: pdf.js is a JavaScript library used to parse PDF files and extract their content in a structured manner (such as text, images, and other media).

 	How It Works:
   When a PDF file is uploaded, the tool loads the file using pdf.js.

   The pdf.js library extracts text content from each page of the PDF and provides access to it.

   The extracted text is then processed and parsed to identify sales data (region and sales).

   pdf.js ensures compatibility with all modern browsers and provides accurate text extraction from PDF documents.

 	Documentation: pdf.js Documentation
3. Chart.js
 	Purpose: Chart.js is a powerful and flexible JavaScript charting library used to create interactive and responsive charts.

 	How It Works:
   Once the data is extracted from the PDF, Chart.js is used to visualize the data in a bar or pie chart.

   The tool creates a canvas element where the chart is rendered, and the chart type (bar or pie) can be toggled by the user.

   Data for the chart is dynamically populated based on the extracted information, such as region names and corresponding sales figures.

   The chart is fully interactive, allowing users to see labels, hover over data points, and switch between chart types.

 	Documentation: chart.js Documentation

HOW IT WORKS TOGETHER
1.	PDF Upload & Data Extraction:
 	When a user uploads a PDF, the loadPDF function is triggered.

 	The pdf.js library processes the PDF and extracts the text content from each page.

 	The extracted text is passed to the processTextData function, where it is parsed for sales data based on a regular expression pattern (Region: <region>, Sales: <sales>).

 	The parsed data (region and sales) is stored in an array (chartData).

2.	Data Visualization:
   The extracted data is visualized using Chart.js. The generateChart function dynamically creates either a bar or pie chart, depending on the user’s selection in the chart-type dropdown.

  	The chart is drawn on a <canvas> element, and users can switch between different chart types by selecting an option from the dropdown.

3.	Region Filter:
 	 After the data is parsed, the regions are extracted and populated in a filter dropdown.

  	When a region is selected, the chart is re-rendered to show only the data for that specific region.
