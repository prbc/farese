# A script to generate a webpage for each state/country, based on a JSON file.
import json
from itertools import groupby

def region_data():
    # Load up our mappings from ISO country codes to display strings
    # Can potentially replace with something like pycountry
    with open('regions.json') as region_file:
        region_data = json.load(region_file)
        return region_data



def region_display_name(region_code):
    for region in region_data():
        if region['code'] == region_code:
            return region['display-name']

def region_file_name(region_code):
    for region in region_data():
        if region['code'] == region_code:
            return region['file-name']

# Generates an html page for the given region based on the given church JSON.
# If this gets complex we should think about using something like Jinja2.
def generate_html(region_code, churches):

    # Load up the template
    with open('text-dir-template.htm') as template_file:
        template = template_file.read()


    # Insert the title of the country
    template = template.replace('{% REGION_NAME %}', region_display_name(region_code))

    churches_html = ""
    for church in churches:
        churches_html += """
        <tr>
        <td>
        <hr WIDTH="100%%"></td>
        </tr>

        <tr>
        <td><b><font face="Calibri">%s&nbsp;</font></b>
        <br><font face="Calibri">%s</font>
        <br><font face="Calibri"><a href="%s">%s</a></font>
        <br><font face="Calibri">%s</font></td>
        </tr>
        """ % (
            church['properties']['name'],
            church['properties']['address'],
            church['properties']['website'],
            church['properties']['website'],
            church['properties']['note']
        )

    template = template.replace('{% CHURCHES %}', churches_html)

    return template.encode('utf-8')

def main():

    # Load up the church data
    with open('map/data.json') as json_string:
        data = json.load(json_string)

    all_churches = data['features']

    # Group churches by region
    for (region, region_churches) in groupby(all_churches, lambda x: x['properties']['region']):

        print('Generating html for region: %s' % region_display_name(region))

        # Generate a page for this region.
        html = generate_html(region, region_churches)

        # Write html to a file.
        with open('rbcd/%s.htm' % (region_file_name(region)), 'w') as outfile:
            outfile.write(html)

if __name__ == "__main__":
    main()
