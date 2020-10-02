export class Mail
{
    id: string;
    from: {
        name: string,
        avatar: string,
        email: string
    };
    user :  {
        logo: {
            link:string
        },
        nom : string,
        prenom : string,
        username : string,
        email : string,
        id : string
    }
    medias : {
        type : string,
        link : string
    }
    to: {
        name: string,
        email: string
    }[];
    responses: Mail[];
    subject: string;
    content:string;
    read_at_by_admin:boolean;
    createAt:Date;
    message: string;
    time: string;
    read: boolean;
    starred: boolean;
    important: boolean;
    hasAttachments: boolean;
    attachments: {
        type: string,
        fileName: string,
        preview: string,
        url: string,
        size: string
    }[];
    labels: string[];
    folder: string;

    /**
     * Constructor
     *
     * @param mail
     */
    constructor(mail)
    {
        this.id = mail.id;
        this.from = mail.from;
        this.to = mail.to;
        this.subject = mail.subject;
        this.message = mail.message;
        this.time = mail.time;
        this.read = mail.read;
        this.starred = mail.starred;
        this.important = mail.important;
        this.hasAttachments = mail.hasAttachments;
        this.attachments = mail.attachments;
        this.labels = mail.labels;
        this.folder = mail.folder;
    }

    /**
     * Toggle star
     */
    toggleStar(): void
    {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        this.important = !this.important;
    }
}
