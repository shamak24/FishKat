import vt
from django.conf import settings

def check_url_safety(url):
    client = vt.Client(settings.VT_API_KEY)
    url_id = vt.url_id(url)
    url = client.get_object("/urls/{}".format(url_id))
    # print(dict(url.last_analysis_stats))
    client.close()
    return dict(url.last_analysis_stats)



