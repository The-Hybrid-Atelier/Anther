import {useForm, UseFormReturnType} from "@mantine/form";
import {Button, Group, TextInput, Select, Textarea, Stack, Container} from "@mantine/core";
import {supabase} from "../supabaseClient.ts";
import {useState} from "react";
import {PostgrestError} from "@supabase/supabase-js";

interface FormValues {
    cop: string;
    category: string;
    note: string;
    name: string;
    email: string;
}

function CoPInput({form}: {form: UseFormReturnType<FormValues>}) {
    return (
        <TextInput
            label="Community of Practice"
            placeholder="Candle Making"
            required
            key={form.key('cop')}
            {...form.getInputProps('cop')}
        />
    );
}

function EmailInput({form}: {form: UseFormReturnType<FormValues>}) {
    return (
        <TextInput
            label="Email"
            placeholder="Your Email"
            type={"email"}
            required
            key={form.key('email')}
            {...form.getInputProps('email')}
        />
    );
}

function NameInput({form}: {form: UseFormReturnType<FormValues>}) {
    return (
        <TextInput
            label="Name"
            placeholder="Your Name"
            required
            key={form.key('name')}
            {...form.getInputProps('name')}
        />
    );

}

function CategoryInput({form}: {form: UseFormReturnType<FormValues>}) {
    return (
        <Select
            data={[
                {value: "casting and molding", label: "Casting and Molding"},
                {value: "ceramics", label: "Ceramics"},
                {value: "digital fabrication", label: "Digital Fabrication"},
                {value: "glass", label: "Glass"},
                {value: "print making", label: "Print Making"},
                {value: "textiles", label: "Textiles"},
                {value: "woodworking", label: "Woodworking"},
                {value: "other", label: "Other"}
            ]}
            label="Which Category does this CoP belong to?"
            placeholder="Select One"
            required
            key={form.key('category')}
            {...form.getInputProps('category')}
        />
    );
}

function NoteInput({form}: {form: UseFormReturnType<FormValues>}) {
    return (
        <Textarea
            label="Additional Info"
            placeholder="Any additional information you'd like to provide, tutorial examples, etc."
            key={form.key('note')}
            {...form.getInputProps('note')}
        />
    );
}


function RequestPage() {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<PostgrestError | null>();

    const writeToSupabase = async (values: FormValues) => {
        const {data, error} = await supabase.from('requestForm').insert([
            {
                name: values.name,
                email: values.email,
                cop: values.cop,
                category: values.category,
                note: values.note
            }
        ])
        if (error) {
            setError(error);
            console.log(error);
        } else {
            console.log(data)
        }
    }

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            cop: "",
            category: "",
            email: "",
            name: "",
            note: ""
        },
    })

    return (
        <Container>
        <h1>Request a Community of Practice</h1>
        <p>Have a community that you would like to see added to Anther? Request it below and we'll do our best to include it in the dataset.</p>
            <form
                onSubmit={
                    form.onSubmit((values) => {
                        setSubmitted(true);
                        writeToSupabase(values).then(() => {
                            form.reset();
                        })
                    })
                }
            >
                <Stack>
                    <NameInput form={form} />
                    <EmailInput form={form} />
                    <CoPInput form={form} />
                    <CategoryInput form={form}/>
                    <NoteInput form={form} />
                    <Group sx={{justifyContent: "flex-start"}} mt="md">
                        <Button type="submit" variant={'light'}>Submit</Button>
                    </Group>
                </Stack>
            </form>
            {submitted && !error && <p>Thank you for your submission! We'll be in touch soon.</p>}
            {error && <p>There was an error submitting your request. Please try again later.</p>}
        </Container>
    );
}

export default RequestPage;