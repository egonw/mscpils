# Programming for the Life Sciences

In the life sciences the interactions between chemical entities is of key interest. Not only do these play an important role in the regulation of gene expression, and therefore all cellular processes, they are also one of the primary approaches in drug discovery. Pharmacology is the science studies the action of drugs, and for many common drugs, this is studying the interaction of small organic molecules and protein targets.

And with the increasing information in the life sciences, automation becomes increasingly important. Big data and small data alike, provide challenges to integrate data from different experiments. The Open PHACTS platform provides web services to support pharmacological research and in this course you will learn how to use such web services from programming languages, allowing you to link data from such knowledge bases to other platforms, such as those for data analysis.

The objectives of the course are:

* to have the ability to recognize various classes of chemical entities in pharmacology
and to understand the basic physical and chemical interactions;
* to be familiar with technologies for web services in the life sciences;
* to obtain experience in using such web services with a programming language;
* to be able to select web services for a particular pharmacological question;
* to have sufficient background for further, more advanced, bioinformatics data analyses;
* to be familiar with modern software development practices.

During the practical you will develop a HTML+JavaScript application to answer a selected biological question. This question is determined as part of the practical, based on your own interest, with guidance from the instructor.

# Course Materials

For basic techniques we would like to refer you to a series of blog posts available at http://chembla-ics.blogspot.nl/search/label/%23mscpils.

The following books can be used:
* “Rang and Dale’s Pharmacology” by Rang et al. (Pearson, 7th edition, 2012).
* “JavaScript & jQuery: The Missing Manual” by D.S. McFarland (O'Reilly, 2nd edition,
2011)

Moreover, Codecademy offers interactive courses that will help you develop your skills, of which parts are free:
* https://www.codecademy.com/learn/learn-html
* https://www.codecademy.com/learn/introduction-to-javascript


## Examples

These examples make use of ops.js by Ian Dunlop (see below) and of d3.js, see http://d3js.org/.

* [example1.html](http://egonw.github.io/mscpils/example1.html): shows a single Open PHACTS web service call and extracts the app_id and app_key from the URL
* example2.html: shows JavaScript data types
* [example3.html](http://egonw.github.io/mscpils/example3.html): basic, static d3.js example
* [example4.html](http://egonw.github.io/mscpils/example4.html): lists the number of activities for paracetamol as bar plot
* [example5.html](http://egonw.github.io/mscpils/example5.html): lists the number of activities for paracetamol as pie chart
* [example6.html](http://egonw.github.io/mscpils/example6.html): shows a histogram with moleculair weights of compounds with activity against a certain target
* [example7.html](http://egonw.github.io/mscpils/example7.html): same as examples 5, but now using [Dimple](http://dimplejs.org/)

The source code can be found in the [gh_pages branch](https://github.com/egonw/mscpils/tree/gh-pages).

## License

The HTML examples are license MIT, see MIT.txt.

The used ops.js libraries are licensed with an unknown license (the author has been contacted).
Information can be found at https://github.com/openphacts/ops.js/

The ops.js, in turn, uses jQuery, which is licensed MIT.
