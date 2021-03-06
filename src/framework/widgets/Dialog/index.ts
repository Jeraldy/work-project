import './style.css';
import Div from '../../core/Div';
import Row, { RowAlignment } from '../../layouts/Row';
import Size from '../../utils/Size';
import TextView from '../../core/TextView';
import ActionItem from '../AppBars/ActionItem';
import Paragraph from '../../core/Paragraph';
import Hr from '../../core/Hr';
import Button from '../Button/Button';
import ButtonType from '../Button/ButtonTypes';

export default ({ open = false, title}: { open?: boolean,title: string }) => {
    const modal = Div({
        class: 'modal',
        style: {
            display: open ? "block" : "none",
            boxShadow: '-3px 3px 3px -3px rgba(0,0,0,.5)',
        },
        children: [
            Row({
                align: RowAlignment.Center,
                children: [
                    Div({
                        class: "modal-content",
                        style: {
                            width: Size._600px
                        },
                        children: [
                            Div({
                                class: "modal-header",
                                style: {
                                    padding: Size._8px
                                },
                                children: [
                                    Row({
                                        align: RowAlignment.SpaceBetween,
                                        children: [
                                            Div({
                                                style: {
                                                    marginTop: Size._10px
                                                },
                                                children: [
                                                    TextView("Title Goes Here")
                                                ]
                                            }),
                                            ActionItem({
                                                icon: 'close',
                                                props: {
                                                    onclick: () => modal.style.display = "none",
                                                    style: {
                                                        marginTop: '-5px',
                                                    }
                                                }
                                            })
                                        ]
                                    })
                                ]
                            }),
                            Div({
                                class: "modal-body",
                                style: {
                                    height: Size._200px
                                },
                                children: [
                                    Paragraph({
                                        children: [TextView(
                                            "Some text in the Modal Body"
                                        )]
                                    })
                                ]
                            }),
                            Hr({}),
                            Div({
                                style: {
                                    padding: Size._8px
                                },
                                children: [
                                    Row({
                                        align: RowAlignment.End,
                                        children: [
                                            Button({
                                                type: ButtonType.OUTLINED, label: 'OKEY',
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    })

    initModal(modal)
    return modal;
}

function initModal(modal: HTMLElement) {
    window.onclick = function (event: Event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}