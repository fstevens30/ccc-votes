export default function AboutPage () {
  return (
    <main className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>About This Site</h1>
      <p>
        In light of a somewhat questionable site being created in order to show
        how councillors have voted, this site has been created to show a more
        balanced and less biased view into voting records. All records are
        sourced directly from the Christchurch City Council meeting agendas, the
        project is also open-source in order to show transparency into how the
        data is gathered.
      </p>
      <p>
        Hopefully this site is no longer needed in the near future, there is
        talks of an official CCC voting record tool being created internally.
        Similar to the Wellington City Council one.
      </p>
    </main>
  )
}
