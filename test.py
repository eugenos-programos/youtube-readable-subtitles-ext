import io
import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

from googleapiclient.http import MediaIoBaseDownload

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

def main():
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "YOUR_CLIENT_SECRET_FILE.json"

    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
    credentials = flow.run_console()
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    request = youtube.captions().download(
        id="8I3Tu9x9YA8"
    )
    # TODO: For this request to work, you must replace "YOUR_FILE"
    #       with the location where the downloaded content should be written.
    fh = io.FileIO("ex.txt", "wb")

    download = MediaIoBaseDownload(fh, request)
    complete = False
    while not complete:
      status, complete = download.next_chunk()


if __name__ == "__main__":
    main()