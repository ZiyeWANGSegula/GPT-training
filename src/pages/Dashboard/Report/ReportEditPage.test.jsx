import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react'
import ReportEditPage from './ReportEditPage';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from "notistack"

describe('ReportEditPage', () => {
    test('renders', () => {
        
        render(
        <SnackbarProvider>
            <MemoryRouter>
                <ReportEditPage></ReportEditPage>
            </MemoryRouter>
        </SnackbarProvider>)


    })
})