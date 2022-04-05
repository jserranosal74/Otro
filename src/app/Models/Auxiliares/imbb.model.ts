export interface ResponseIMBB {
    data:    Data;
    success: boolean;
    status:  number;
}

export interface Data {
    id:         string;
    title:      string;
    urlViewer:  string;
    url:        string;
    displayURL: string;
    size:       number;
    time:       string;
    expiration: string;
    is360:      number;
    image:      Image;
    thumb:      Image;
    deleteURL:  string;
}

export interface Image {
    filename:  string;
    name:      string;
    mime:      string;
    extension: string;
    url:       string;
}
