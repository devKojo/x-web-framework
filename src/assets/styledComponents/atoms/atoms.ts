import { ButtonComponentPropType, ImageComponentPropType } from "../../../types/types";

export class ButtonComponent {
    public render(props: ButtonComponentPropType): string {
        const { id, label = 'Explore', href, type='button' } = props;

        return type.toLowerCase() === 'link'
            ? `<a href="${href}" data-id="${id}" data-route>${label}</a>`
            : `<button data-id="${id}" data-href="${href}" data-route>${label}</button>`;
    }

    // Method to attach an event handler
    public attachEventHandler(btnId: string, handler: () => void): void {
        const element = document.querySelector(`[data-id="${btnId}"]`);

        if (element) {
            element.addEventListener('click', handler.bind(element));
        }
    }
}

export class ImageComponent{
    public render(props:ImageComponentPropType):string{
        const {src, alt, id, width, height} = props;
       return `<img src='${src}' loading='lazy' alt='${alt}' width='${width}' height='${height}'>`
    }
}

