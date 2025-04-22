using Clean.Core;

namespace Domain;

public sealed class ExportExcelKnwuWedstrijdOutput(byte[] file, string filename) : IFileOutput
{
    public byte[] File => file;
    public string Filename => filename;
}
